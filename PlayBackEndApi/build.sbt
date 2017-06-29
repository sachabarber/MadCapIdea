import play.sbt._
import sbt.Keys._
import sbt._

name := "play-streaming-scala"

version := "1.0-SNAPSHOT"

scalaVersion := "2.11.11"

lazy val root = (project in file(".")).enablePlugins(play.sbt.PlayScala)

javacOptions ++= Seq("-source", "1.8", "-target", "1.8", "-Xlint")

routesGenerator := InjectedRoutesGenerator

libraryDependencies ++= Seq(
  "org.reactivemongo" %% "play2-reactivemongo" % "0.11.12"
)

initialize := {
  val _ = initialize.value
  if (sys.props("java.specification.version") != "1.8")
    sys.error("Java 8 is required for this project.")
}
