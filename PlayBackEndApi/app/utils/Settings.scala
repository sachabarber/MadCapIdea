

package utils {

  import com.typesafe.config.ConfigFactory


  object Settings {

    val config = ConfigFactory.load("application.conf")

    val kafkaConfig = config.getConfig("kafka")
    val bootStrapServers = kafkaConfig.getString("bootStrapServers")
    val ratingRestApiDefaultHostName = kafkaConfig.getString("ratingRestApiDefaultHostName")
    val ratingRestApiDefaultPort = kafkaConfig.getInt("ratingRestApiDefaultPort")
    val ACKS_CONFIG = "acks"
  }
}