package entities

import play.api.libs.json._
import play.api.libs.functional.syntax._

case class Job(clientFullName: String,
               clientEmail: String,
               driverFullName: String,
               driverEmail: String,
               vehicleDescription: String,
               vehicleRegistrationNumber: String,
               isAssigned:Boolean,
               isCompleted:Boolean
              )

object Job {
  implicit val formatter = Json.format[Job]
}

object JobJsonFormatters {

  implicit val jobWrites = new Writes[Job] {
    def writes(job: Job) = Json.obj(
      "clientFullName" -> job.clientFullName,
      "clientEmail" -> job.clientEmail,
      "driverFullName" -> job.driverFullName,
      "driverEmail" -> job.driverEmail,
      "vehicleDescription" -> job.vehicleDescription,
      "vehicleRegistrationNumber" -> job.vehicleRegistrationNumber,
      "isAssigned" -> job.isAssigned,
      "isCompleted" -> job.isCompleted
    )
  }

  implicit val jobReads: Reads[Job] = (
      (JsPath \ "clientFullName").read[String] and
      (JsPath \ "clientEmail").read[String] and
      (JsPath \ "driverFullName").read[String] and
      (JsPath \ "driverEmail").read[String] and
      (JsPath \ "vehicleDescription").read[String] and
      (JsPath \ "vehicleRegistrationNumber").read[String] and
      (JsPath \ "isAssigned").read[Boolean] and
      ((JsPath \ "isCompleted").read[Boolean])
    )(Job.apply _)
}
