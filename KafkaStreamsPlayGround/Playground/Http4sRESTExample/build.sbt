name := "SImpleRestApi"

version := "1.0"

scalaVersion := "2.12.1"

val http4sVersion = "0.15.16"


libraryDependencies ++= Seq(
  "org.http4s" %% "http4s-dsl"          % http4sVersion,
  "org.http4s" %% "http4s-blaze-server" % http4sVersion,
  "org.http4s" %% "http4s-blaze-client" % http4sVersion,
  "org.http4s" %% "http4s-circe"        % http4sVersion,
  "io.circe"   %% "circe-generic"       % "0.6.1",
  "io.circe"   %% "circe-literal"       % "0.6.1"

)
        