import Entities.{Hello, User}
import org.http4s.client.blaze.PooledHttp1Client
import scalaz.concurrent.Task
import io.circe.generic.auto._
import io.circe.syntax._
import org.http4s.circe._
import org.http4s.dsl._
import org.http4s.client._


object RestClient extends App {

  val httpClient = PooledHttp1Client()

  run()


  def run() : Unit = {

    val hello = helloClient("foo").run
    println(s"Hello ${hello}")
    scala.io.StdIn.readLine()
    ()
  }

  def helloClient(name: String): Task[Hello] = {
    // Encode a User request
    val req = POST(uri("http://localhost:8080/hello"), User(name).asJson)
    // Decode a Hello response
    httpClient.expect(req)(jsonOf[Hello])
  }




}