/*
 * Copyright (C) 2009-2016 Lightbend Inc. <http://www.lightbend.com>
 */
package controllers

import java.time.ZonedDateTime
import java.time.format.DateTimeFormatter
import javax.inject.{Inject, Singleton}

import akka.actor.ActorSystem
import akka.stream.{ActorMaterializer, ActorMaterializerSettings, Materializer, Supervision}
import akka.stream.scaladsl.{BroadcastHub, Keep, MergeHub, Source}
import play.api.http.ContentTypes
import play.api.libs.Comet
import play.api.libs.json._
import play.api.mvc.{Controller, _}
import Entities._
import Entities.JsonFormatters._

import scala.concurrent.ExecutionContext


object flipper
{
  var current: Boolean = false
}


@Singleton
class ScalaCometController @Inject()
  (
    implicit actorSystem: ActorSystem,
    ec: ExecutionContext
  )
  extends Controller  {

  //Error handling for streams
  //http://doc.akka.io/docs/akka/2.5.2/scala/stream/stream-error.html
  val decider: Supervision.Decider = {
    case _                      => Supervision.Restart
  }

  implicit val mat = ActorMaterializer(
    ActorMaterializerSettings(actorSystem).withSupervisionStrategy(decider))


  val (sink, source) =
    MergeHub.source[JsValue](perProducerBufferSize = 16)
      .toMat(BroadcastHub.sink(bufferSize = 256))(Keep.both)
      .run()

  def streamClock() = Action {
    Ok.chunked(source via Comet.json("parent.clockChanged")).as(ContentTypes.HTML)
  }

  def kickRandomTime() = Action {

    var finalJsonValue:JsValue=null

    flipper.current = !flipper.current
    if(flipper.current) {
      finalJsonValue = Json.toJson(Location(1.0,1.0))
    } else {
      val rand = DateTimeFormatter.ofPattern("ss mm HH").format(ZonedDateTime.now().minusSeconds(scala.util.Random.nextInt))
      finalJsonValue = Json.toJson(Resident("Hove", 12, Some(rand)))
    }
    Source.single(finalJsonValue).runWith(sink)
    Ok(s"We sent '$finalJsonValue'")
  }

}
