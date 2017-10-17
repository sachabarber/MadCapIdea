package services


import javax.inject._
import play.api.inject.ApplicationLifecycle
import scala.concurrent.Future

trait PlayLifetime {
  def starting(): Unit
  def stopping(): Unit
}


@Singleton
class PlayLifetimeImpl @Inject() (appLifecycle: ApplicationLifecycle) extends PlayLifetime {
  override def starting(): Unit = println("Starting!")
  override def stopping(): Unit = println("Stopping!")

  def start(): Unit = starting()

  appLifecycle.addStopHook { () =>
    stopping()
    Future.successful(())
  }

  // Called when this singleton is constructed (could be replaced by `hello()`)
  start()
}
