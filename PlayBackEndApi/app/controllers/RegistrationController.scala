package controllers

import javax.inject.Inject

import play.api.libs.json.{JsError, JsSuccess, Json}
import play.api.mvc.{Action, Controller, Result}
import Entities._
import Entities.JsonFormatters._

import scala.concurrent.{ExecutionContext, Future}
import play.modules.reactivemongo._
import reactivemongo.play.json.collection._
import play.api.Logger
import reactivemongo.api.ReadPreference
import utils.Errors

class RegistrationController @Inject()(val reactiveMongoApi: ReactiveMongoApi)
  (implicit ec: ExecutionContext)
  extends Controller with MongoController with ReactiveMongoComponents {

  def passRegistrationFuture: Future[JSONCollection] = database.map(_.collection[JSONCollection]("passenger-registrations"))


  def savePassengerRegistration = Action.async(parse.json) { request =>
    Json.fromJson[PassengerRegistration](request.body) match {
      case JsSuccess(newPassRegistration, _) =>
        dealWithRegistration(newPassRegistration)
//        for {
//          passRegs <- passRegistrationFuture
//          lastError <- passRegs.insert(newPassRegistration)
//        } yield {
//          Logger.debug(s"Successfully inserted with LastError: $lastError")
//          Ok("Saved passenger registration")
//        }
      case JsError(errors) =>
        Future.successful(BadRequest("Could not build a PassengerRegistration from the json provided. " +
          Errors.show(errors)))
    }
  }

  def dealWithRegistration(incomingRegistration : PassengerRegistration) : Future[Result] = {
    val jsObj = Json.toJson(incomingRegistration)
    val existingRegFuture : Future[List[PassengerRegistration]] = passRegistrationFuture.flatMap {
      _.find(jsObj).
        cursor[PassengerRegistration](ReadPreference.primary).
        collect[List]()
    }
    existingRegFuture.map(regs =>
      if(regs.length == 0) {
        for {
          passRegistration <- passRegistrationFuture
          writeResult <- passRegistration.insert(incomingRegistration)
        } yield {
          Logger.debug(s"Successfully inserted with LastError: $writeResult")
          Ok("Saved passenger registration")
        }
      }
      else {
        BadRequest("Registration already exists")
      }
    ).map(_.asInstanceOf[Result])
  }
}
