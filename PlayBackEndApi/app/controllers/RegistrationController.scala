package controllers

import javax.inject.Inject

import play.api.mvc.{Action, Controller, Result}
import Entities._
import Entities.JsonFormatters._

import scala.concurrent.{ExecutionContext, Future}
import play.modules.reactivemongo._
import play.api.Logger
import utils.Errors
import play.api.libs.json._
import reactivemongo.api.ReadPreference
import reactivemongo.play.json._
import collection._

import scala.util.{Failure, Success}

class RegistrationController @Inject()(val reactiveMongoApi: ReactiveMongoApi)
  (implicit ec: ExecutionContext)
  extends Controller with MongoController with ReactiveMongoComponents {

  def passRegistrationFuture: Future[JSONCollection] = database.map(_.collection[JSONCollection]("passenger-registrations"))


  def savePassengerRegistration = Action.async(parse.json) { request =>
    Json.fromJson[PassengerRegistration](request.body) match {
      case JsSuccess(newPassRegistration, _) =>

        //Future(Ok("All cool"))

        //this is not waiting to complete the future
        //but if I need to wait for it why use future at all???
        //dealWithRegistration(newPassRegistration)

        for {
          res <-  dealWithRegistration(newPassRegistration)
        } yield {
          Logger.debug(s"Successfully registered")
          try { res }
          catch { case e: Exception => BadRequest("Oh no") }
        }
      case JsError(errors) =>
        Future.successful(BadRequest("Could not build a PassengerRegistration from the json provided. " +
          Errors.show(errors)))
    }
  }

  def dealWithRegistration(incomingRegistration : PassengerRegistration) : Future[Result] = {

    val query = Json.obj("email" -> Json.obj("$eq" -> incomingRegistration.email))

    val existingRegFuture : Future[List[PassengerRegistration]] = passRegistrationFuture.flatMap {
        //_.find(Json.obj())
        _.find(query)
        .cursor[PassengerRegistration](ReadPreference.primary)
        .collect[List]()
    }

    existingRegFuture.flatMap(theList=>
    {
      if (theList.length == 0) {
        for {
          passRegistration <- passRegistrationFuture
          writeResult <- passRegistration.insert(incomingRegistration)
        } yield {
          Logger.debug(s"Successfully inserted with LastError: $writeResult")
          Future(Ok("Saved passenger registration"))
        }
      }
      else {
        Future(BadRequest("Registration already exists"))
      }
    }).map(_.asInstanceOf[Result])
  }
}
