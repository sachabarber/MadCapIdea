package controllers

import javax.inject.Inject
import play.api.mvc.{Action, Controller, Result}
import entities._
import entities.DriverRegistrationJsonFormatters._
import entities.PassengerRegistrationJsonFormatters._
import scala.concurrent.{ExecutionContext, Future}
import play.modules.reactivemongo._
import play.api.Logger
import utils.Errors
import play.api.libs.json._
import reactivemongo.api.ReadPreference
import reactivemongo.play.json._
import collection._

class RegistrationController @Inject()
  (val reactiveMongoApi: ReactiveMongoApi)
  (implicit ec: ExecutionContext)
  extends Controller with MongoController with ReactiveMongoComponents {

  def passRegistrationFuture: Future[JSONCollection] = database.map(_.collection[JSONCollection]("passenger-registrations"))
  def driverRegistrationFuture: Future[JSONCollection] = database.map(_.collection[JSONCollection]("driver-registrations"))


  def savePassengerRegistration = Action.async(parse.json) { request =>
    Json.fromJson[PassengerRegistration](request.body) match {
      case JsSuccess(newPassRegistration, _) =>

        //https://github.com/ReactiveMongo/ReactiveMongo-Extensions/blob/0.10.x/guide/dsl.md
        val query = Json.obj("email" -> Json.obj("$eq" -> newPassRegistration.email))

        dealWithRegistration[PassengerRegistration](
          newPassRegistration,
          passRegistrationFuture,
          query,
          PassengerRegistration.formatter)
      case JsError(errors) =>
        Future.successful(BadRequest("Could not build a PassengerRegistration from the json provided. " +
          Errors.show(errors)))
    }
  }

  def saveDriverRegistration = Action.async(parse.json) { request =>
    Json.fromJson[DriverRegistration](request.body) match {
      case JsSuccess(newDriverRegistration, _) =>

        //https://github.com/ReactiveMongo/ReactiveMongo-Extensions/blob/0.10.x/guide/dsl.md
        val query = Json.obj("email" -> Json.obj("$eq" -> newDriverRegistration.email))

        dealWithRegistration[DriverRegistration](
          newDriverRegistration,
          driverRegistrationFuture,
          query,
          DriverRegistration.formatter)
      case JsError(errors) =>
        Future.successful(BadRequest("Could not build a DriverRegistration from the json provided. " +
          Errors.show(errors)))
    }
  }

  private def dealWithRegistration[T](
          incomingRegistration: T,
          jsonCollectionFuture: Future[JSONCollection],
          query: JsObject,
          formatter: OFormat[T])
          (implicit ec: ExecutionContext): Future[Result] = {

    def hasExistingRegistrationFuture = jsonCollectionFuture.flatMap {
        //http://reactivemongo.org/releases/0.11/documentation/advanced-topics/collection-api.html
        _.find(query)
        .cursor[JsObject](ReadPreference.primary)
        .collect[List]()
      }.map(_.length match {
          case 0 => false
          case _ => true
      }
    )

    hasExistingRegistrationFuture.flatMap {
      case false => {
        for {
          registrations <- jsonCollectionFuture
          writeResult <- registrations.insert(incomingRegistration)(formatter,ec)
        } yield {
          Logger.debug(s"Successfully inserted with LastError: $writeResult")
          Ok(Json.obj())
        }
      }
      case true => Future(BadRequest("Registration already exists"))
    }
  }
}
