package actors.job

import kafka.topics.JobTopics
import serialization.JSONSerde
import akka.Done
import akka.actor.{Actor, PoisonPill}
import akka.kafka.ProducerSettings
import akka.kafka.scaladsl.Producer
import akka.stream.scaladsl.{Keep, MergeHub, Source}
import akka.stream.{ActorMaterializer, KillSwitches}
import entities.Job
import org.apache.kafka.clients.producer.ProducerRecord
import org.apache.kafka.common.serialization.{ByteArraySerializer, StringSerializer}
import utils.Settings

import scala.concurrent.ExecutionContext
import scala.util.{Failure, Success}


class JobProducerActor(
  implicit materializer: ActorMaterializer,
  ec: ExecutionContext
) extends Actor {

  val jSONSerde = new JSONSerde[Job]
  val jobProducerSettings = ProducerSettings(
    context.system,
    new StringSerializer,
    new ByteArraySerializer)
    .withBootstrapServers(s"${Settings.bootStrapServers}")

  val ((mergeHubSink, killswitch), kafkaSourceFuture) =
    MergeHub.source[Job](perProducerBufferSize = 16)
      .map(job => {
        val jobBytes = jSONSerde.serializer().serialize("", job)
        (job, jobBytes)
      })
      .map { jobWithBytes =>
        val (job, jobBytes) = jobWithBytes
        new ProducerRecord[String, Array[Byte]](
          JobTopics.JOB_SUBMIT_TOPIC, job.clientEmail, jobBytes)
      }
      .viaMat(KillSwitches.single)(Keep.both)
      .toMat(Producer.plainSink(jobProducerSettings))(Keep.both)
      .run()

  kafkaSourceFuture.onComplete {
    case Success(value) => println(s"Got the callback, value = $value")
    case Failure(e) => {
      self ! PoisonPill
    }
  }

  override def postStop(): Unit = {
    super.postStop()
    println(s"JobProducerActor seen 'Done'")
    killswitch.shutdown()
  }

  override def receive: Receive = {
    case (job: Job) => {
      println(s"JobProducerActor seen ${job}")
      Source.single(job).runWith(mergeHubSink)
    }
    case Done => {
      println(s"JobProducerActor seen 'Done'")
      killswitch.shutdown()
      self ! PoisonPill
    }
  }
}