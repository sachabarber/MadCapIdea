package controllers

import javax.inject.Inject

import play.api.libs.json.{JsError, Json}
import play.api.mvc.{Action, BodyParsers, Controller}
import Entities._
import Entities.JsonFormatters._


class RegistrationController @Inject()(environment: play.api.Environment)
  extends Controller {

  def savePassengerRegistration() = Action(BodyParsers.parse.json) { request =>
    val regResult = request.body.validate[PassengerRegistration]
    regResult.fold(
      errors => {
        BadRequest(Json.obj("status" -> "Error", "message" ->
          JsError.toJson(errors)))
      },
      reg => {
        //TODO : should save the PassengerRegistration here
        //TODO : should save the PassengerRegistration here
        //TODO : should save the PassengerRegistration here
        //TODO : should save the PassengerRegistration here
        Ok(Json.obj("status" -> "OK", "message" ->
          ("PassengerRegistration '" + reg.email + "' saved.") ))
      }
    )
  }


}
