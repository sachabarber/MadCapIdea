
package processing.ratings

import java.util.concurrent.TimeUnit

  import entities.Rating
  import serialization.JSONSerde
  import topics.RatingsTopics

  import scala.util.Random
  import org.apache.kafka.clients.producer.ProducerRecord
  import org.apache.kafka.clients.producer.KafkaProducer
  import org.apache.kafka.common.serialization.Serdes
  import utils.Settings
  import org.apache.kafka.clients.producer.ProducerConfig

  object RatingsProducerApp extends App {

   run()

    private def run(): Unit = {

      val jSONSerde = new JSONSerde[Rating]
      val random = new Random
      val producerProps = Settings.createBasicProducerProperties
      val ratingsList = List(
        Rating("jarden@here.com","sacha@here.com", 1.5f),
        Rating("miro@here.com","mary@here.com", 1.5f),
        Rating("anne@here.com","margeret@here.com", 3.5f),
        Rating("frank@here.com","bert@here.com", 2.5f),
        Rating("morgan@here.com","ruth@here.com", 1.5f))

      System.out.println("Connecting to Kafka cluster via bootstrap servers " +
        s"${producerProps.getProperty(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG)}")

      // send a random string from List event every 100 milliseconds
      val ratingProducer = new KafkaProducer[String, Array[Byte]](
        producerProps, Serdes.String.serializer, Serdes.ByteArray.serializer)

      while (true) {
      //for (i <- 0 to 10) {
        val rating = ratingsList(random.nextInt(ratingsList.size))
        val ratingBytes = jSONSerde.serializer().serialize("", rating)
        System.out.println(s"Writing rating ${rating} to input topic ${RatingsTopics.RATING_SUBMIT_TOPIC}")
        ratingProducer.send(new ProducerRecord[String, Array[Byte]](
          RatingsTopics.RATING_SUBMIT_TOPIC, rating.toEmail, ratingBytes))
        Thread.sleep(500)
      }

      Runtime.getRuntime.addShutdownHook(new Thread(() => {
        ratingProducer.close(10, TimeUnit.SECONDS)
      }))
    }
  }