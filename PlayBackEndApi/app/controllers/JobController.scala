package controllers

import javax.inject.Inject

import Entities.Job
import Entities.JobJsonFormatters._
import entities._
import actors.job.{JobConsumerActor, JobProducerActor}
import akka.actor.{ActorSystem, OneForOneStrategy, Props, SupervisorStrategy}
import akka.pattern.{Backoff, BackoffSupervisor}
import akka.stream.scaladsl.{BroadcastHub, Keep, MergeHub}
import akka.stream.{ActorMaterializer, ActorMaterializerSettings, Supervision}
import play.api.http.ContentTypes
import play.api.libs.Comet
import play.api.libs.json._
import play.api.libs.json.Json
import play.api.libs.json.Format
import play.api.libs.json.JsSuccess
import play.api.libs.json.Writes
import play.api.mvc.{Action, Controller}
import utils.Errors

import scala.concurrent.{ExecutionContext, Future}
import scala.util.Random
import scala.concurrent.duration._

class JobController @Inject()
(
  implicit actorSystem: ActorSystem,
  ec: ExecutionContext
) extends Controller
{
  val rand = new Random()

  //Error handling for streams
  //http://doc.akka.io/docs/akka/2.5.2/scala/stream/stream-error.html
  val decider: Supervision.Decider = {
    case _ => Supervision.Restart
  }

  implicit val mat = ActorMaterializer(
    ActorMaterializerSettings(actorSystem).withSupervisionStrategy(decider))

  val (sink, source) =
    MergeHub.source[JsValue](perProducerBufferSize = 16)
      .toMat(BroadcastHub.sink(bufferSize = 256))(Keep.both)
      .run()

  //job producer
  val childJobProducerActorProps = Props(classOf[JobProducerActor],mat,ec)
  val jobProducerSupervisorProps = createBackoffSupervisor(childJobProducerActorProps,s"JobProducerActor_${rand.nextInt()}")
  val jobProducerSupervisorActorRef = actorSystem.actorOf(jobProducerSupervisorProps, name = "jobProducerSupervisor")

  //job consumer
  val childJobConsumerActorProps = Props(new JobConsumerActor(sink)(mat,ec))
  val jobConsumerSupervisorProps = createBackoffSupervisor(childJobConsumerActorProps,s"JobConsumerActor_${rand.nextInt()}")
  val jobConsumerSupervisorActorRef = actorSystem.actorOf(jobConsumerSupervisorProps, name = "jobConsumerSupervisor")
  jobConsumerSupervisorActorRef ! Init


  def streamedJob() = Action {
    Ok.chunked(source via Comet.json("parent.jobChanged")).as(ContentTypes.HTML)
  }


  def submitJob = Action.async(parse.json) { request =>
    Json.fromJson[Job](request.body) match {
      case JsSuccess(job, _) => {
        jobProducerSupervisorActorRef ! job
        Future.successful(Ok(Json.toJson(job.copy(clientEmail = job.clientEmail.toUpperCase))))
      }
      case JsError(errors) =>
        Future.successful(BadRequest("Could not build a Job from the json provided. " +
          Errors.show(errors)))
    }
  }


  private def createBackoffSupervisor(childProps:Props, actorChildName: String) : Props = {
    BackoffSupervisor.props(
      Backoff.onStop(
        childProps,
        childName = actorChildName,
        minBackoff = 3.seconds,
        maxBackoff = 30.seconds,
        randomFactor = 0.2
      ).withSupervisorStrategy(
        OneForOneStrategy() {
          case _ => SupervisorStrategy.Restart
        })
    )
  }

}