package entities

import akka.http.scaladsl.marshallers.sprayjson.SprayJsonSupport._
import spray.json.DefaultJsonProtocol._

object AkkaHttpEntitiesJsonFormats {
  implicit val RatingFormat = jsonFormat3(Rating)
  implicit val HostStoreInfoFormat = jsonFormat3(HostStoreInfo)
}