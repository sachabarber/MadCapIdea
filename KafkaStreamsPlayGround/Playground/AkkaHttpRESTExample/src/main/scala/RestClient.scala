import Entities.DomainEntitiesJsonFormats._
import Entities._
import akka.actor.ActorSystem
import akka.http.scaladsl.Http
import akka.http.scaladsl.marshallers.sprayjson.SprayJsonSupport._
import akka.http.scaladsl.model._
import akka.stream.ActorMaterializer
import scala.concurrent.Future
import scala.io.StdIn
import akka.http.scaladsl.unmarshalling.Unmarshal
import spray.json._

import scala.util.{Failure, Success}

object RestClient extends App {

  run()


  def run() {

    implicit val system = ActorSystem("my-system")
    implicit val materializer = ActorMaterializer()
    implicit val executionContext = system.dispatcher

    println(s"Client attempting to fetch from online " +
      "at http://localhost:8080/order/beans\nPress RETURN to stop...")

    val responseFuture: Future[Order] = {
      Http().singleRequest(HttpRequest(uri = "http://localhost:8080/order/beans"))
        .flatMap(response => Unmarshal(response.entity).to[Order])
    }

    responseFuture onComplete {
      case Failure(ex) => System.out.println(s"Failed to perform GET, reason: $ex")
      case Success(response) => System.out.println(s"Server responded with $response")
    }

    Runtime.getRuntime.addShutdownHook(new Thread(() => {
      system.terminate() // and shutdown when done
    }))

    StdIn.readLine() // let it run until user presses return
  }
}