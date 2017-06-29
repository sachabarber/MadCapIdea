package Entities


import play.api.libs.json._
import play.api.libs.functional.syntax._

case class PassengerRegistration(fullName: String, email: String, password : String)

case class Location(lat: Double, long: Double)
case class Resident(name: String, age: Int, role: Option[String])


object JsonFormatters {

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


  implicit val locationReads: Reads[Location] = (
    (JsPath \ "lat").read[Double] and
      (JsPath \ "long").read[Double]
    )(Location.apply _)


  implicit val locationWrites = new Writes[Location] {
    def writes(location: Location) = Json.obj(
      "lat" -> location.lat,
      "long" -> location.long
    )
  }

  implicit val residentWrites = new Writes[Resident] {
    def writes(resident: Resident) = Json.obj(
      "name" -> resident.name,
      "age" -> resident.age,
      "role" -> resident.role
    )
  }


}
