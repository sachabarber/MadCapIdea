package Entities

import akka.http.scaladsl.marshallers.sprayjson.SprayJsonSupport._
import spray.json.DefaultJsonProtocol._

final case class Item(name: String, id: Long)
final case class Order(items: List[Item])

object DomainEntitiesJsonFormats {
  implicit val itemFormat = jsonFormat2(Item)
  implicit val orderFormat = jsonFormat1(Order)
}
