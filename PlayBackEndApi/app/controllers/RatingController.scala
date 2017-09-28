package controllers

import javax.inject.Inject

import Actors.Rating.RatingProducerActor
import Entities.RatingJsonFormatters._
import Entities._
import akka.actor.{ActorSystem, OneForOneStrategy, Props, SupervisorStrategy}
import akka.pattern.{Backoff, BackoffSupervisor}
import akka.stream.{ActorMaterializer, ActorMaterializerSettings, Supervision}
import play.api.libs.json._
import play.api.libs.json.Json
import play.api.libs.json.Format
import play.api.libs.json.JsSuccess
import play.api.libs.json.Writes
import play.api.libs.ws._
import play.api.mvc.{Action, Controller}
import utils.{Errors, Settings}

import scala.concurrent.{ExecutionContext, Future}
import scala.util.Random
import scala.concurrent.duration._

class RatingController @Inject()
(
  implicit actorSystem: ActorSystem,
  ec: ExecutionContext,
  ws: WSClient
) extends Controller
{

  //Error handling for streams
  //http://doc.akka.io/docs/akka/2.5.2/scala/stream/stream-error.html
  val decider: Supervision.Decider = {
    case _                      => Supervision.Restart
  }

  implicit val mat = ActorMaterializer(
    ActorMaterializerSettings(actorSystem).withSupervisionStrategy(decider))
  val childRatingActorProps = Props(classOf[RatingProducerActor],mat,ec)
  val rand = new Random()
  val ratingSupervisorProps = BackoffSupervisor.props(
    Backoff.onStop(
      childRatingActorProps,
      childName = s"RatingProducerActor_${rand.nextInt()}",
      minBackoff = 3.seconds,
      maxBackoff = 30.seconds,
      randomFactor = 0.2
    ).withSupervisorStrategy(
      OneForOneStrategy() {
        case _ => SupervisorStrategy.Restart
      })
    )

  val ratingSupervisorActorRef = actorSystem.actorOf(ratingSupervisorProps, name = "ratingSupervisor")

  def submitNewRating = Action.async(parse.json) { request =>
    Json.fromJson[Rating](request.body) match {
      case JsSuccess(newRating, _) => {
        ratingSupervisorActorRef ! newRating
        Future.successful(Ok(Json.toJson(newRating.copy(toEmail = newRating.toEmail.toUpperCase))))
      }
      case JsError(errors) =>
        Future.successful(BadRequest("Could not build a Rating from the json provided. " +
          Errors.show(errors)))
    }
  }




  def ratingByEmail = Action.async { request =>

    val email = request.getQueryString("email")
    email match {
      case Some(emailAddress) => {
//        val url = s"http://${Settings.ratingRestApiHostName}:${Settings.ratingRestApiPort}/ratingByEmail?email=${emailAddress}"
//        ws.url(url).get().map {
//          response => (response.json).validate[List[Rating]]
//        }.map(x => Ok(Json.toJson(x.get)))

        Future.successful(Ok(Json.toJson(List[Rating](Rating("junk1","junk1",1),Rating("junk2","junk2",2),Rating("junk3","junk3",3)))))

      }
      case None => {
        Future.successful(BadRequest(
          "ratingByEmail endpoint MUST be supplied with a non empty 'email' query string value"))
      }
    }
  }
}
