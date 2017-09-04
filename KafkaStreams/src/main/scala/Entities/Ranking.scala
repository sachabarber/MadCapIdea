package Entities

import akka.http.scaladsl.marshallers.sprayjson.SprayJsonSupport._
import spray.json.DefaultJsonProtocol._

case class Ranking(fromEmail: String, toEmail: String, score: Float)

object AkkaHttpEntitiesJsonFormats {
  implicit val RankingFormat = jsonFormat3(Ranking)
}


