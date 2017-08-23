import java.util.Properties
import scala.util.Random
import org.apache.kafka.clients.producer.ProducerRecord
import org.apache.kafka.clients.producer.KafkaProducer
import org.apache.kafka.common.serialization.Serdes
import org.apache.kafka.streams.StreamsConfig

object RatingsProducerApp extends App {

  val config = createConfig(args)
  val schemaRegistryUrl = if (args.length > 1) args(1)
  else "http://localhost:8081"

  val jSONSerde = new JSONSerde[Ranking]

  run()

  private def run() : Unit = {

    System.out.println(s"Connecting to Kafka cluster via bootstrap servers ${config.getProperty(StreamsConfig.BOOTSTRAP_SERVERS_CONFIG)}")
    System.out.println(s"Connecting to Confluent schema registry at ${schemaRegistryUrl}")
    val rankingList = List(
      Ranking("sacha@here.com",1.5),
      Ranking("david@here.com",3.5),
      Ranking("sam@here.com",2.5),
      Ranking("danial@here.com",1))
    val random = new Random

    // send a random string from List event every 100 milliseconds
    val playEventProducer = new KafkaProducer[String, Array[Byte]](config, Serdes.String.serializer, Serdes.ByteArray.serializer)

    while (true) {
      val ranking = rankingList(random.nextInt(rankingList.size))
      val rankingBytes = jSONSerde.serializer().serialize("", ranking)
      System.out.println(s"Writing ranking ${ranking} to input topic ${RatingsTopics.RATING_SUBMIT_TOPIC}")
      playEventProducer.send(new ProducerRecord[String, Array[Byte]](RatingsTopics.RATING_SUBMIT_TOPIC, ranking.email, rankingBytes))
      Thread.sleep(100)
    }
  }

  private def createConfig(args:Array[String]) : Properties = {
    val config: Properties = {
      val p = new Properties()
      val bootstrapServers = if (args.length > 0) args(0) else "localhost:9092"
      p.put(StreamsConfig.BOOTSTRAP_SERVERS_CONFIG, bootstrapServers)
      p
    }
    config
  }

}



