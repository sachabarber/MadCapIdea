package controllers

import javax.inject.Inject

import play.api.mvc.{Action, Controller, Result}
import Entities._
import Entities.JsonFormatters._

import scala.concurrent.{Await, ExecutionContext, Future}
import play.modules.reactivemongo._
import play.api.Logger
import utils.Errors
import play.api.libs.json._
import reactivemongo.api.ReadPreference
import reactivemongo.play.json._
import collection._

import scala.concurrent.duration._
import scala.concurrent.ExecutionContext.Implicits.global

class RegistrationController @Inject()(val reactiveMongoApi: ReactiveMongoApi)
  (implicit ec: ExecutionContext)
  extends Controller with MongoController with ReactiveMongoComponents {

  def passRegistrationFuture: Future[JSONCollection] = database.map(_.collection[JSONCollection]("passenger-registrations"))


  def savePassengerRegistration = Action.async(parse.json) { request =>
    Json.fromJson[PassengerRegistration](request.body) match {
      case JsSuccess(newPassRegistration, _) =>

        //https://github.com/ReactiveMongo/ReactiveMongo-Extensions/blob/0.10.x/guide/dsl.md
        val query = Json.obj("email" -> Json.obj("$eq" -> newPassRegistration.email))

        val registrationFuture = dealWithRegistration[PassengerRegistration](
          newPassRegistration,
          passRegistrationFuture,
          query,
          PassengerRegistration.formatter)
        try {
          val result = Await.result(registrationFuture, 60 second)
          Future(result)
        }
        catch {
          case e: Exception =>  {
            Future(BadRequest(e.getMessage))
          }
        }
      case JsError(errors) =>
        Future.successful(BadRequest("Could not build a PassengerRegistration from the json provided. " +
          Errors.show(errors)))
    }
  }

  def dealWithRegistration[T](
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
          Ok("Saved registration")
        }
      }
      case true => Future(BadRequest("Registration already exists"))
    }
  }
}
