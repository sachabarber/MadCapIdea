import java.lang.Long
import java.util.Properties
import java.util.concurrent.TimeUnit
import org.apache.kafka.common.serialization._
import org.apache.kafka.streams._
import org.apache.kafka.streams.kstream.{KStreamBuilder, KTable}
import java.util


object RatingStreamProcessingApp extends App {

  val config = createConfig(args)
  run()

  private def createConfig(args:Array[String]) : Properties = {
    val config: Properties = {
      val p = new Properties()
      val bootstrapServers = if (args.length > 0) args(0) else "localhost:9092"
      p.put(StreamsConfig.BOOTSTRAP_SERVERS_CONFIG, bootstrapServers)
      p.put(StreamsConfig.APPLICATION_ID_CONFIG, "ratings-application")
      p.put(StreamsConfig.CLIENT_ID_CONFIG, "ratings-application-client")
      p.put(StreamsConfig.DEFAULT_KEY_SERDE_CLASS_CONFIG, Serdes.String().getClass)
      p.put(StreamsConfig.DEFAULT_VALUE_SERDE_CLASS_CONFIG, Serdes.String().getClass)
      // Records should be flushed every 10 seconds. This is less than the default
      // in order to keep this example interactive.
      p.put(StreamsConfig.COMMIT_INTERVAL_MS_CONFIG, 10 * 1000)
      // For illustrative purposes we disable record caches
      p.put(StreamsConfig.CACHE_MAX_BYTES_BUFFERING_CONFIG, 0)
      p
    }
    config
  }


  private def run() : Unit = {
    val stringSerde = Serdes.String
    val longSerde = Serdes.Long
    val builder: KStreamBuilder = new KStreamBuilder
    val textLines = builder.stream(stringSerde, stringSerde, RatingsTopics.RATING_SUBMIT_TOPIC)
    val wordCounts : KTable[String, Long] =
      textLines.flatMapValues(value => util.Arrays.asList(value.toLowerCase.split("\\W+")))
      .groupBy((_, word) => word)
      .count("Counts")
    wordCounts.to(stringSerde,longSerde,RatingsTopics.RATING_OUTPUT_TOPIC)
    val streams: KafkaStreams = new KafkaStreams(builder, config)
    streams.start()

    Runtime.getRuntime.addShutdownHook(new Thread(() => {
      streams.close(10, TimeUnit.SECONDS)
    }))

    ()
  }
}



