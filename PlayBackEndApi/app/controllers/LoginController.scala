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

    Future.successful(BadRequest("NOT DONE YET"))

//    Json.fromJson[Login](request.body) match {
//      case JsSuccess(newLoginDetails, _) =>
//
//        //https://github.com/ReactiveMongo/ReactiveMongo-Extensions/blob/0.10.x/guide/dsl.md
//        val query = Json.obj("email" -> Json.obj("$eq" -> newLoginDetails.email))
//
//        newLoginDetails.isDriver match {
//          case false => {
//            fetchExistsingRegistration[PassengerRegistration](
//              newLoginDetails,
//              passRegistrationFuture,
//              query,
//              PassengerRegistration.formatter)
//          }
//          case true => {
//            fetchExistsingRegistration[DriverRegistration](
//              newLoginDetails,
//              driverRegistrationFuture,
//              query,
//              DriverRegistration.formatter)
//          }
//        }
//
//
//
//      case JsError(errors) =>
//        Future.successful(BadRequest("Could not build a Login from the json provided. " +
//          Errors.show(errors)))
//    }
  }


//  def fetchExistsingRegistration[T](
//          incomingLogin: Login,
//          jsonCollectionFuture: Future[JSONCollection],
//          query: JsObject,
//          formatter: OFormat[T])
//          (implicit ec: ExecutionContext): Future[Result] = {
//
//    def hasExistingRegistrationFuture = jsonCollectionFuture.flatMap {
//        //http://reactivemongo.org/releases/0.11/documentation/advanced-topics/collection-api.html
//        _.find(query)
//        .cursor[JsObject](ReadPreference.primary)
//        .collect[List]()
//      }
//    )
//
//    hasExistingRegistrationFuture.flatMap(existingRegs => {
//
//    })
//  }
}
