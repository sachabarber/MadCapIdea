package actors.job

import Entities.Job
import Kafka.Topics.JobTopics
import Serialization.JSONSerde
import akka.Done
import akka.actor.{Actor, ActorSystem, PoisonPill}
import akka.kafka.{ConsumerSettings, ProducerSettings, Subscriptions}
import akka.kafka.scaladsl.{Consumer, Producer}
import akka.stream.scaladsl.{Keep, MergeHub, Sink, Source}
import akka.stream.{ActorMaterializer, KillSwitches}
import org.apache.kafka.clients.consumer.ConsumerConfig
import org.apache.kafka.clients.producer.ProducerRecord
import org.apache.kafka.common.serialization.{ByteArrayDeserializer, ByteArraySerializer, StringDeserializer, StringSerializer}
import utils.Settings

import scala.concurrent.ExecutionContext
import scala.util.{Failure, Success}



//TODO : This actor shouls take in a way of pushing back to Websocket
class JobConsumerActor(
                        implicit materializer: ActorMaterializer,
                        ec: ExecutionContext
                      ) extends Actor {

  val jSONSerde = new JSONSerde[Job]
  val jobConsumerSettings = ConsumerSettings(
    context.system,new StringDeserializer(),new ByteArrayDeserializer())
    .withBootstrapServers(s"${Settings.bootStrapServers}")
    .withGroupId("group1")
    .withProperty(ConsumerConfig.AUTO_OFFSET_RESET_CONFIG, "earliest")

  val ((_, killswitch), kafkaConsumerFuture) =
    Consumer.committableSource(jobConsumerSettings, Subscriptions.topics(JobTopics.JOB_SUBMIT_TOPIC))
      .mapAsync(1) { msg => {
        val jobBytes = msg.record.value
        val job = jSONSerde.deserializer().deserialize(JobTopics.JOB_SUBMIT_TOPIC,jobBytes)
        self ! job
        msg.committableOffset.commitScaladsl()
      }
      }
      .viaMat(KillSwitches.single)(Keep.both)
      .toMat(Sink.last)(Keep.both)
      .run()


  kafkaConsumerFuture.onComplete {
    case Success(value) => println(s"Got the callback, value = $value")
    case Failure(e) => {
      self ! PoisonPill
    }

  }

  override def postStop(): Unit = {
    super.postStop()
    println(s"JobConsumerActor seen 'Done'")
    killswitch.shutdown()
  }

  override def receive: Receive = {
    case (job: Job) => {
      println(s"JobProducerActor seen ${job}")

      //TODO : Job should be sent out over the websocket stuff
    }
    case Done => {
      println(s"JobConsumerActor seen 'Done'")
      killswitch.shutdown()
      self ! PoisonPill
    }
  }
}