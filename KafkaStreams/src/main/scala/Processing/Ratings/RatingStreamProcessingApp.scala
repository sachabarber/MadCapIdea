import java.util.Properties
import java.util.concurrent.TimeUnit
import org.apache.kafka.common.serialization._
import org.apache.kafka.streams._
import org.apache.kafka.streams.kstream._
import Entities.Ranking
import Serialization.JSONSerde
import Topics.RatingsTopics
import Utils.Settings

package Processing.Ratings {

  import Stores.StateStores
  import org.apache.kafka.streams.state.HostInfo


  class DummyRankingReducer extends Reducer[Ranking] {
    override def apply(value1: Ranking, value2: Ranking): Ranking = {
      value2
    }
  }

  class RankingByEmailInitializer extends Initializer[List[Ranking]] {
    override def apply(): List[Ranking] = List[Ranking]()
  }

  class RankingByEmailAggregator extends Aggregator[String, Ranking,List[Ranking]] {
    override def apply(aggKey: String, value: Ranking, aggregate: List[Ranking]) = {
      value :: aggregate
    }
  }


  object RatingStreamProcessingApp extends App {

    run()

    private def run() : Unit = {
      val stringSerde = Serdes.String
      val rankingSerde = new JSONSerde[Ranking]
      val listRankingSerde = new JSONSerde[List[Ranking]]
      val builder: KStreamBuilder = new KStreamBuilder
      val rankings = builder.stream(stringSerde, rankingSerde, RatingsTopics.RATING_SUBMIT_TOPIC)

      val rankingTable = rankings.groupByKey(stringSerde,rankingSerde)
        .aggregate(
          new RankingByEmailInitializer(),
          new RankingByEmailAggregator(),
          listRankingSerde,
          StateStores.RANKINGS_BY_EMAIL_STORE
        )

      rankingTable.toStream.print()

      val streams: KafkaStreams = new KafkaStreams(builder, Settings.createRatingStreamsProperties)
      val restEndpoint:HostInfo  = new HostInfo(Settings.restApiDefaultHostName, Settings.restApiDefaultPort)
      System.out.println(s"Connecting to Kafka cluster via bootstrap servers ${Settings.bootStrapServers}")
      System.out.println(s"REST endpoint at http://${restEndpoint.host}:${restEndpoint.port}")

      // Always (and unconditionally) clean local state prior to starting the processing topology.
      // We opt for this unconditional call here because this will make it easier for you to play around with the example
      // when resetting the application for doing a re-run (via the Application Reset Tool,
      // http://docs.confluent.io/current/streams/developer-guide.html#application-reset-tool).
      //
      // The drawback of cleaning up local state prior is that your app must rebuilt its local state from scratch, which
      // will take time and will require reading all the state-relevant data from the Kafka cluster over the network.
      // Thus in a production scenario you typically do not want to clean up always as we do here but rather only when it
      // is truly needed, i.e., only under certain conditions (e.g., the presence of a command line flag for your app).
      // See `ApplicationResetExample.java` for a production-like example.
      streams.cleanUp();
      streams.start()
      val restService = new RatingRestService(streams, restEndpoint)
      restService.start()

      Runtime.getRuntime.addShutdownHook(new Thread(() => {
        streams.close(10, TimeUnit.SECONDS)
        restService.stop
      }))

      //return unit
      ()
    }
  }





}
