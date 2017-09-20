package controllers

import javax.inject.Inject

import Actors.Rating.RatingProducerActor
import Entities.RatingJsonFormatters._
import Entities._
import akka.actor.{ActorSystem, OneForOneStrategy, Props, SupervisorStrategy}
import akka.pattern.{Backoff, BackoffSupervisor}
import akka.stream.{ActorMaterializer, ActorMaterializerSettings, Supervision}
import play.api.libs.json._
import play.api.mvc.{Action, Controller}
import utils.Errors

import scala.concurrent.{ExecutionContext, Future}
import scala.util.Random
import scala.concurrent.duration._

class RatingController @Inject()
(
  implicit actorSystem: ActorSystem,
  ec: ExecutionContext
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
}
