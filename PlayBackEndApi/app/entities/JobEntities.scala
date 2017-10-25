package entities

import play.api.libs.json._
import play.api.libs.functional.syntax._

case class Job
(
  jobUUID: String,
  clientFullName: String,
  clientEmail: String,
  clientPosition: Option[Position],
  driverFullName: String,
  driverEmail: String,
  driverPosition: Option[Position],
  vehicleDescription: String,
  vehicleRegistrationNumber: String,
  isAssigned:Boolean,
  isCompleted:Boolean
)

case class Position(latitude:Double,longitude:Double)


object Job {
  implicit val positionFormatter = Json.format[Position]
  implicit val jobFormatter = Json.format[Job]
}


object JobJsonFormatters {

  implicit val positionWrites: Writes[Position] = (
      (JsPath \ "latitude").write[Double] and
      (JsPath \ "longitude").write[Double]
    )(unlift(Position.unapply))


  implicit val positionReads: Reads[Position] =
    (
      (JsPath \ "latitude").read[Double] and
      (JsPath \ "longitude").read[Double]
    )(Position.apply _)


  implicit val jobWrites: Writes[Job] = (
      (JsPath \ "jobUUID").write[String] and
      (JsPath \ "clientFullName").write[String] and
      (JsPath \ "clientEmail").write[String] and
      (JsPath \ "clientPosition").writeNullable[Position] and
      (JsPath \ "driverFullName").write[String] and
      (JsPath \ "driverEmail").write[String] and
      (JsPath \ "driverPosition").writeNullable[Position] and
      (JsPath \ "vehicleDescription").write[String] and
      (JsPath \ "vehicleRegistrationNumber").write[String] and
      (JsPath \ "isAssigned").write[Boolean] and
      (JsPath \ "isCompleted").write[Boolean]
    )(unlift(Job.unapply))


  implicit val jobReads: Reads[Job] =
    (
      (JsPath \ "jobUUID").read[String] and
      (JsPath \ "clientFullName").read[String] and
      (JsPath \ "clientEmail").read[String] and
      (JsPath \ "clientPosition").readNullable[Position] and
      (JsPath \ "driverFullName").read[String] and
      (JsPath \ "driverEmail").read[String] and
      (JsPath \ "driverPosition").readNullable[Position] and
      (JsPath \ "vehicleDescription").read[String] and
      (JsPath \ "vehicleRegistrationNumber").read[String] and
      (JsPath \ "isAssigned").read[Boolean] and
      (JsPath \ "isCompleted").read[Boolean]
    )(Job.apply _)
}