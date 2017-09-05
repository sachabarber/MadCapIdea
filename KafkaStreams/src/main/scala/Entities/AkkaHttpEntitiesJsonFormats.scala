package Entities

import akka.http.scaladsl.marshallers.sprayjson.SprayJsonSupport._
import spray.json.DefaultJsonProtocol._

object AkkaHttpEntitiesJsonFormats {
  implicit val RankingFormat = jsonFormat3(Ranking)
  implicit val HostStoreInfoFormat = jsonFormat3(HostStoreInfo)
}