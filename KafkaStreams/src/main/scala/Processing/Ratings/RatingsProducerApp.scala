
package Processing.Ratings {

  import java.util.concurrent.TimeUnit

  import Entities.Ranking
  import Serialization.JSONSerde
  import Topics.RatingsTopics

  import scala.util.Random
  import org.apache.kafka.clients.producer.ProducerRecord
  import org.apache.kafka.clients.producer.KafkaProducer
  import org.apache.kafka.common.serialization.Serdes
  import Utils.Settings
  import org.apache.kafka.clients.producer.ProducerConfig

  object RatingsProducerApp extends App {

   run()

    private def run(): Unit = {

      val jSONSerde = new JSONSerde[Ranking]
      val random = new Random
      val producerProps = Settings.createBasicProducerProperties
      val rankingList = List(
        Ranking("jarden@here.com","sacha@here.com", 1.5f),
        Ranking("miro@here.com","mary@here.com", 1.5f),
        Ranking("anne@here.com","margeret@here.com", 3.5f),
        Ranking("frank@here.com","bert@here.com", 2.5f),
        Ranking("morgan@here.com","ruth@here.com", 1.5f))

      producerProps.put(ProducerConfig.ACKS_CONFIG, "all")

      System.out.println("Connecting to Kafka cluster via bootstrap servers " +
        s"${producerProps.getProperty(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG)}")

      // send a random string from List event every 100 milliseconds
      val rankingProducer = new KafkaProducer[String, Array[Byte]](
        producerProps, Serdes.String.serializer, Serdes.ByteArray.serializer)

      while (true) {
      //for (i <- 0 to 10) {
        val ranking = rankingList(random.nextInt(rankingList.size))
        val rankingBytes = jSONSerde.serializer().serialize("", ranking)
        System.out.println(s"Writing ranking ${ranking} to input topic ${RatingsTopics.RATING_SUBMIT_TOPIC}")
        rankingProducer.send(new ProducerRecord[String, Array[Byte]](
          RatingsTopics.RATING_SUBMIT_TOPIC, ranking.toEmail, rankingBytes))
        Thread.sleep(500)
      }

      Runtime.getRuntime.addShutdownHook(new Thread(() => {
        rankingProducer.close(10, TimeUnit.SECONDS)
      }))
    }
  }
}