

package Utils {

  import java.util.Properties
  import com.typesafe.config.ConfigFactory
  import org.apache.kafka.clients.producer.ProducerConfig
  import org.apache.kafka.common.serialization.Serdes
  import org.apache.kafka.streams.StreamsConfig


  object Settings {

    val config = ConfigFactory.load("streamsApplication.conf")

    val kafkaConfig = config.getConfig("kafka")
    val zooKeepers = kafkaConfig.getString("zooKeepers")
    val bootStrapServers = kafkaConfig.getString("bootStrapServers")
    val partition = kafkaConfig.getInt("partition")
    val restApiDefaultHostName = kafkaConfig.getString("restApiDefaultHostName")
    val restApiDefaultPort = kafkaConfig.getInt("restApiDefaultPort")


    def createBasicProducerProperties(): Properties = {
      val props = new Properties()
      props.put(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG, bootStrapServers)
      props.put(ProducerConfig.ACKS_CONFIG, "all")
      props
    }

    def createRatingStreamsProperties() : Properties = {
      val props = createBasicStreamProperties
      props.put(StreamsConfig.APPLICATION_ID_CONFIG, "ratings-application")
      props.put(StreamsConfig.CLIENT_ID_CONFIG, "ratings-application-client")
      props.put(StreamsConfig.DEFAULT_KEY_SERDE_CLASS_CONFIG, Serdes.String().getClass)
      props.put(StreamsConfig.DEFAULT_VALUE_SERDE_CLASS_CONFIG, Serdes.String().getClass)
      props
    }

    private def createBasicStreamProperties() : Properties = {
      val props = new Properties()
      props.put(StreamsConfig.BOOTSTRAP_SERVERS_CONFIG, bootStrapServers)
      props.put(StreamsConfig.DEFAULT_KEY_SERDE_CLASS_CONFIG, Serdes.String().getClass)
      props.put(StreamsConfig.DEFAULT_VALUE_SERDE_CLASS_CONFIG, Serdes.String().getClass)
      // Records should be flushed every 10 seconds. This is less than the default
      // in order to keep this example interactive.
      props.put(StreamsConfig.COMMIT_INTERVAL_MS_CONFIG, 10000.asInstanceOf[Object])
      // For illustrative purposes we disable record caches
      props.put(StreamsConfig.CACHE_MAX_BYTES_BUFFERING_CONFIG, 0.asInstanceOf[Object])
      props
    }
  }
}