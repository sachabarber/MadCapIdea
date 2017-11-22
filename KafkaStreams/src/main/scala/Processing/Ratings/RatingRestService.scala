package processing.ratings

import org.apache.kafka.streams.KafkaStreams
import org.apache.kafka.streams.state.HostInfo
import akka.actor.ActorSystem
import akka.http.scaladsl.Http
import akka.http.scaladsl.model._
import akka.http.scaladsl.server.Directives._
import akka.stream.ActorMaterializer
import akka.http.scaladsl.marshallers.sprayjson.SprayJsonSupport._
import spray.json.DefaultJsonProtocol._
import entities.AkkaHttpEntitiesJsonFormats._
import entities._
import stores.StateStores
import akka.http.scaladsl.marshalling.ToResponseMarshallable
import org.apache.kafka.common.serialization.Serdes
import scala.concurrent.{Await, ExecutionContext, Future}
import akka.http.scaladsl.unmarshalling.Unmarshal
import spray.json._
import scala.util.{Failure, Success}
import org.apache.kafka.streams.state.QueryableStoreTypes
import scala.concurrent.duration._



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
    val storeNameRegexPattern =  """\w+""".r

    val route =
      path("ratingByEmail") {
        get {
          parameters('email.as[String]) { (email) =>
            try {

              val host = metadataService.streamsMetadataForStoreAndKey[String](
                StateStores.RATINGS_BY_EMAIL_STORE,
                email,
                Serdes.String().serializer()
              )

              var future:Future[List[Rating]] = null

              //store is hosted on another process, REST Call
              if(!thisHost(host))
                future = fetchRemoteRatingByEmail(host, email)
              else
                future = fetchLocalRatingByEmail(email)

              val ratings = Await.result(future, 20 seconds)
              complete(ratings)
            }
            catch {
              case (ex: Exception) => {
                val finalList:List[Rating] = scala.collection.immutable.List[Rating]()
                complete(finalList)
              }
            }
          }
        }
      } ~
      path("instances") {
        get {
          complete(ToResponseMarshallable.apply(metadataService.streamsMetadata))
        }
      }~
      path("instances" / storeNameRegexPattern) { storeName =>
        get {
          complete(ToResponseMarshallable.apply(metadataService.streamsMetadataForStore(storeName)))
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


  def fetchRemoteRatingByEmail(host:HostStoreInfo, email: String) : Future[List[Rating]] = {

    val requestPath = s"http://${hostInfo.host}:${hostInfo.port}/ratingByEmail?email=${email}"
    println(s"Client attempting to fetch from online at ${requestPath}")

    val responseFuture: Future[List[Rating]] = {
      Http().singleRequest(HttpRequest(uri = requestPath))
        .flatMap(response => Unmarshal(response.entity).to[List[Rating]])
    }

    responseFuture
  }

  def fetchLocalRatingByEmail(email: String) : Future[List[Rating]] = {

    val ec = ExecutionContext.global

    println(s"client fetchLocalRatingByEmail email=${email}")

    val host = metadataService.streamsMetadataForStoreAndKey[String](
      StateStores.RATINGS_BY_EMAIL_STORE,
      email,
      Serdes.String().serializer()
    )

    val f = StateStores.waitUntilStoreIsQueryable(
      StateStores.RATINGS_BY_EMAIL_STORE,
      QueryableStoreTypes.keyValueStore[String,List[Rating]](),
      streams
    ).map(_.get(email))(ec)

    val mapped = f.map(rating => {
      if (rating == null)
        List[Rating]()
      else
        rating
    })

    mapped
  }

  def stop() : Unit = {
    bindingFuture
      .flatMap(_.unbind()) // trigger unbinding from the port
      .onComplete(_ => system.terminate()) // and shutdown when done
  }

  def thisHost(hostStoreInfo: HostStoreInfo) : Boolean = {
    hostStoreInfo.host.equals(hostInfo.host()) &&
      hostStoreInfo.port == hostInfo.port
  }
}
