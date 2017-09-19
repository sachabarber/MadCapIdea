package entities


import play.api.libs.json._
import play.api.libs.functional.syntax._

case class DriverRegistration(
   fullName: String,
   email: String,
   password: String,
   vehicleDescription: String,
   vehicleRegistrationNumber: String)

object DriverRegistration {
  implicit val formatter = Json.format[DriverRegistration]
}

object DriverRegistrationJsonFormatters {

  implicit val driverRegistrationWrites = new Writes[DriverRegistration] {
    def writes(driverRegistration: DriverRegistration) = Json.obj(
      "fullname" -> driverRegistration.fullName,
      "email" -> driverRegistration.email,
      "password" -> driverRegistration.password,
      "vehicleDescription" -> driverRegistration.vehicleDescription,
      "vehicleRegistrationNumber" -> driverRegistration.vehicleRegistrationNumber
    )
  }

  implicit val driverRegistrationReads: Reads[DriverRegistration] = (
    (JsPath \ "fullname").read[String] and
      (JsPath \ "email").read[String] and
      (JsPath \ "password").read[String] and
      (JsPath \ "vehicleDescription").read[String] and
      (JsPath \ "vehicleRegistrationNumber").read[String]
    )(DriverRegistration.apply _)
}
