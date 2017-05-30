package Entities

case class Location(lat: Double, long: Double)
case class Resident(name: String, age: Int, role: Option[String])

import play.api.libs.json._



object JsonFormatters {

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
