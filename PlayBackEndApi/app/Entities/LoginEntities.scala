package entities

import play.api.libs.json._
import play.api.libs.functional.syntax._

case class Login(email: String, password: String, isDriver: Boolean)

object Login {
  implicit val formatter = Json.format[Login]
}

object LoginJsonFormatters {

  implicit val loginWrites = new Writes[Login] {
    def writes(login: Login) = Json.obj(
      "email" -> login.email,
      "password" -> login.password,
      "isDriver" -> login.isDriver
    )
  }

  implicit val loginReads: Reads[Login] = (
      (JsPath \ "email").read[String] and
      (JsPath \ "password").read[String] and
      ((JsPath \ "isDriver").read[Boolean])
    )(Login.apply _)
}
