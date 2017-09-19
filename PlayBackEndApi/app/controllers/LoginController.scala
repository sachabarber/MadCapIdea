package controllers

import javax.inject.Inject

import entities.DriverRegistrationJsonFormatters._
import entities.PassengerRegistrationJsonFormatters._
import entities._
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
            val maybePassengerReg = extractExistingRegistration(
              passRegistrationFuture.flatMap {
                _.find(Json.obj("email" -> Json.obj("$eq" -> newLoginDetails.email))).
                  cursor[JsObject](ReadPreference.primary).
                  collect[List]()
              })
            returnRedactedRegistration[PassengerRegistration](
              maybePassengerReg,
              (reg: PassengerRegistration) => Ok(Json.toJson(reg.copy(password = "")))
            )

          }
          case true => {
            val maybeDriverReg = extractExistingRegistration(
              driverRegistrationFuture.flatMap {
                _.find(Json.obj("email" -> Json.obj("$eq" -> newLoginDetails.email))).
                  cursor[JsObject](ReadPreference.primary).
                  collect[List]()
              })
            returnRedactedRegistration[DriverRegistration](
              maybeDriverReg,
              (reg: DriverRegistration) => Ok(Json.toJson(reg.copy(password = "")))
            )
          }
        }
      case JsError(errors) =>
        Future.successful(BadRequest("Could not build a Login from the json provided. " +
          Errors.show(errors)))
    }
  }

  private def returnRedactedRegistration[T]
  (
    maybeDriverRegFuture: Future[Option[JsObject]],
    redactor : T => Result
  )(implicit reads: Reads[T]): Future[Result] = {
    maybeDriverRegFuture.map {
      case Some(json) => {
        val reg = Json.fromJson[T](json)
        reg match {
          case JsSuccess(reg, _) => {
            redactor(reg)
          }
          case _ => BadRequest("Registration already exists")
        }
      }
      case None => BadRequest("Could not find registration")
    }
  }

  private def extractExistingRegistration[T]
  (incomingRegistrations: Future[List[T]])
  (implicit writes: Writes[T], ec: ExecutionContext): Future[Option[T]] = {
    incomingRegistrations.map(matchedRegistrations =>
      matchedRegistrations.length match {
        case 0 => None
        case _ => Some(matchedRegistrations(0))
      }
    )
  }
}
