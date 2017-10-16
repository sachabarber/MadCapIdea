package controllers

import javax.inject.Inject

import Entities.JobJsonFormatters._
import Entities._
import actors.job.JobProducerActor
import akka.actor.{ActorSystem, OneForOneStrategy, Props, SupervisorStrategy}
import akka.pattern.{Backoff, BackoffSupervisor}
import akka.stream.{ActorMaterializer, ActorMaterializerSettings, Supervision}
import Entities.Job
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

class JobController @Inject()
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
  val childJobActorProps = Props(classOf[JobProducerActor],mat,ec)
  val rand = new Random()
  val jobSupervisorProps = BackoffSupervisor.props(
    Backoff.onStop(
      childJobActorProps,
      childName = s"JobProducerActor_${rand.nextInt()}",
      minBackoff = 3.seconds,
      maxBackoff = 30.seconds,
      randomFactor = 0.2
    ).withSupervisorStrategy(
      OneForOneStrategy() {
        case _ => SupervisorStrategy.Restart
      })
  )

  val jobSupervisorActorRef = actorSystem.actorOf(jobSupervisorProps, name = "jobSupervisor")

  def submitJob = Action.async(parse.json) { request =>
    Json.fromJson[Job](request.body) match {
      case JsSuccess(job, _) => {
        jobSupervisorActorRef ! job
        Future.successful(Ok(Json.toJson(job.copy(clientEmail = job.clientEmail.toUpperCase))))
      }
      case JsError(errors) =>
        Future.successful(BadRequest("Could not build a Job from the json provided. " +
          Errors.show(errors)))
    }
  }

}