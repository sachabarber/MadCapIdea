package controllers

import javax.inject.Inject

import Entities.DriverRegistrationJsonFormatters._
import Entities.PassengerRegistrationJsonFormatters._
import Entities._
import play.api.Logger
import play.api.libs.json._
import play.api.mvc.{Action, Controller, Result}
import play.modules.reactivemongo._
import reactivemongo.api.ReadPreference
import reactivemongo.play.json._
import reactivemongo.play.json.collection._
import utils.Errors


import scala.concurrent.{ExecutionContext, Future}

class LoginController @Inject()(val reactiveMongoApi: ReactiveMongoApi)
                               (implicit ec: ExecutionContext)
  extends Controller with MongoController with ReactiveMongoComponents {

  def passRegistrationFuture: Future[JSONCollection] = database.map(_.collection[JSONCollection]("passenger-registrations"))
  def driverRegistrationFuture: Future[JSONCollection] = database.map(_.collection[JSONCollection]("driver-registrations"))


  def validateLogin = Action.async(parse.json) { request =>

    Json.fromJson[Login](request.body) match {
      case JsSuccess(newLoginDetails, _) =>
        newLoginDetails.isDriver match {
          case false => {
            val passengerQuery = Json.obj("email" -> Json.obj("$eq" -> newLoginDetails.email))
            extractExistingRegistration(passRegistrationFuture.flatMap {
              _.find(Json.obj("email" -> Json.obj("$eq" -> newLoginDetails.email))).
                cursor[JsObject](ReadPreference.primary).
                collect[List]()
            })
          }
          case true => {
            val driverQuery = Json.obj("email" -> Json.obj("$eq" -> newLoginDetails.email))
            extractExistingRegistration(driverRegistrationFuture.flatMap {
              _.find(Json.obj("email" -> Json.obj("$eq" -> newLoginDetails.email))).
                cursor[JsObject](ReadPreference.primary).
                collect[List]()
            })
          }
        }
      case JsError(errors) =>
        Future.successful(BadRequest("Could not build a Login from the json provided. " +
          Errors.show(errors)))
    }
  }

  def extractExistingRegistration[T](
          incomingRegistrations: Future[List[T]])
          (implicit writes: Writes[T], ec: ExecutionContext): Future[Result] = {
    incomingRegistrations.map(matchedRegistrations =>
      matchedRegistrations.length match {
        case 0 => BadRequest("Registration already exists")
        case _ => Ok(Json.toJson(matchedRegistrations(0)))
      }
    )
  }
}
