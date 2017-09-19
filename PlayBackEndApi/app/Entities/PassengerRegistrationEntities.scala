package entities

import play.api.libs.json._
import play.api.libs.functional.syntax._

case class PassengerRegistration(
  fullName: String,
  email: String,
  password: String)

object PassengerRegistration {
  implicit val formatter = Json.format[PassengerRegistration]
}

object PassengerRegistrationJsonFormatters {

  implicit val passengerRegistrationWrites = new Writes[PassengerRegistration] {
    def writes(passengerRegistration: PassengerRegistration) = Json.obj(
      "fullname" -> passengerRegistration.fullName,
      "email" -> passengerRegistration.email,
      "password" -> passengerRegistration.password
    )
  }

  implicit val passengerRegistrationReads: Reads[PassengerRegistration] = (
    (JsPath \ "fullname").read[String] and
      (JsPath \ "email").read[String] and
      (JsPath \ "password").read[String]
    )(PassengerRegistration.apply _)
}
