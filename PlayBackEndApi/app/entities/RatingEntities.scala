package entities

import play.api.libs.json._
import play.api.libs.functional.syntax._

case class Rating(fromEmail: String, toEmail: String, score: Float)

object Rating {
  implicit val formatter = Json.format[Rating]
}

object RatingJsonFormatters {

  implicit val ratingWrites = new Writes[Rating] {
    def writes(rating: Rating) = Json.obj(
      "fromEmail" -> rating.fromEmail,
      "toEmail" -> rating.toEmail,
      "score" -> rating.score
    )
  }

  implicit val ratingReads: Reads[Rating] = (
    (JsPath \ "fromEmail").read[String] and
      (JsPath \ "toEmail").read[String] and
      ((JsPath \ "score").read[Float])
    )(Rating.apply _)
}