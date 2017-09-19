import play.sbt._
import sbt.Keys._
import sbt._

name := "play-streaming-scala"

version := "1.0-SNAPSHOT"

scalaVersion := "2.11.11"

lazy val root = (project in file(".")).enablePlugins(play.sbt.PlayScala)

val configVersion = "1.0.1"

javacOptions ++= Seq("-source", "1.8", "-target", "1.8", "-Xlint")

routesGenerator := InjectedRoutesGenerator

libraryDependencies ++= Seq(
  "com.typesafe.akka" % "akka-stream-kafka_2.11" % "0.17",
  "org.skinny-framework.com.fasterxml.jackson.module" % "jackson-module-scala_2.11" % "2.8.4",
  "com.typesafe"        % "config" % configVersion
)

initialize := {
  val _ = initialize.value
  if (sys.props("java.specification.version") != "1.8")
    sys.error("Java 8 is required for this project.")
}
