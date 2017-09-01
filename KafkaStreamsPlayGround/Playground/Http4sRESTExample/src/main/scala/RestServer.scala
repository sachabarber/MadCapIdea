import Entities.{Hello, User}
import io.circe.generic.auto._
import io.circe.syntax._
import org.http4s._
import org.http4s.circe._
import org.http4s.dsl._
import org.http4s.server.blaze._

object RestServer extends App {

  run()


  def run() : Unit = {

    val jsonService = HttpService {
      case req @ POST -> Root / "hello" =>
        for {
        // Decode a User request
          user <- req.as(jsonOf[User])
          // Encode a hello response
          resp <- Ok(Hello(user.name).asJson)
        } yield (resp)

      case req @ GET -> Root / "test" =>
        for {

          resp <- Ok(Hello("Monkey").asJson)
        } yield (resp)

    }

    val builder = BlazeBuilder.bindHttp(8080).mountService(jsonService, "/")
    val blazeServer = builder.run

    scala.io.StdIn.readLine()
    ()
  }

}
