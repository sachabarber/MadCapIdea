

package utils {

  import com.typesafe.config.ConfigFactory


  object Settings {

    val config = ConfigFactory.load("application.conf")
    val kafkaConfig = config.getConfig("kafka")
    val bootStrapServers = kafkaConfig.getString("bootStrapServers")
    val ratingRestApiHostName = kafkaConfig.getString("restApiDefaultHostName")
    val ratingRestApiPort = kafkaConfig.getInt("restApiDefaultPort")
    val ACKS_CONFIG = "acks"
  }
}