name := "RatingsApp"

version := "1.0"

scalaVersion := "2.12.0"


val kafkaStreamsVersion = "0.11.0.0"

libraryDependencies ++= Seq(
  "org.apache.kafka" % "kafka-streams" % kafkaStreamsVersion,
  "org.apache.kafka" % "kafka-clients" % kafkaStreamsVersion,
  "org.rocksdb" % "rocksdbjni" % "5.6.1",
  "org.apache.commons" % "commons-lang3" % "3.6",
  "org.skinny-framework.com.fasterxml.jackson.module" % "jackson-module-scala_2.12" % "2.8.4"
)