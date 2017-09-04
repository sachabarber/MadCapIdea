package Processing.Ratings

import org.apache.kafka.streams.KafkaStreams
import org.apache.kafka.streams.state.HostInfo
import akka.actor.ActorSystem
import akka.http.scaladsl.Http
import akka.http.scaladsl.model._
import akka.http.scaladsl.server.Directives._
import akka.stream.ActorMaterializer
import akka.http.scaladsl.marshallers.sprayjson.SprayJsonSupport._
import spray.json.DefaultJsonProtocol._
import Entities.AkkaHttpEntitiesJsonFormats._
import Entities._
import akka.http.scaladsl.marshalling.ToResponseMarshallable

import scala.concurrent.Future


object RestService {
  val DEFAULT_REST_ENDPOINT_HOSTNAME  = "localhost"
}


class RatingRestService(val streams: KafkaStreams, val hostInfo: HostInfo) {

  val metadataService = new MetadataService(streams)
  var bindingFuture: Future[Http.ServerBinding] = null
  implicit val system = ActorSystem("rating-system")
  implicit val materializer = ActorMaterializer()
  implicit val executionContext = system.dispatcher


  def start() : Unit = {
    val emailRegexPattern =  """\w+""".r


    val route =
      path("ratingByEmail" / emailRegexPattern) { email =>
        get {

          //TODO : This would come from Kafka store, either local or remote

          complete(List[Ranking](
            Ranking("fred@here.com", "sacha@there.com", 4.0f),
            Ranking("sam@here.com", "sacha@there.com", 2.0f))
          )
        }
      }

    bindingFuture = Http().bindAndHandle(route, hostInfo.host, hostInfo.port)
    println(s"Server online at http://${hostInfo.host}:${hostInfo.port}/\n")

    Runtime.getRuntime.addShutdownHook(new Thread(() => {
      bindingFuture
        .flatMap(_.unbind()) // trigger unbinding from the port
        .onComplete(_ => system.terminate()) // and shutdown when done
    }))
  }


  def stop() : Unit = {
    bindingFuture
      .flatMap(_.unbind()) // trigger unbinding from the port
      .onComplete(_ => system.terminate()) // and shutdown when done
  }
}
