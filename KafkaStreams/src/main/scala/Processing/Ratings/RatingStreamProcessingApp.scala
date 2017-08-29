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
      val doubleSerde = Serdes.Double
      val rankingSerde = new JSONSerde[Ranking]
      val listRankingSerde = new JSONSerde[List[Ranking]]
      val builder: KStreamBuilder = new KStreamBuilder
      val rankings = builder.stream(stringSerde, rankingSerde, RatingsTopics.RATING_SUBMIT_TOPIC)

//      val rankingTable = rankings.groupByKey(stringSerde,rankingSerde)
//        .reduce(new DummyRankingReducer)

      val rankingTable = rankings.groupByKey(stringSerde,rankingSerde)
        .aggregate(
          new RankingByEmailInitializer(),
          new RankingByEmailAggregator(),
          listRankingSerde,
          StateStores.RANKINGS_BY_EMAIL_STORE
        )

      rankingTable.toStream.print()

      val streams: KafkaStreams = new KafkaStreams(builder, Settings.createRatingStreamsProperties)
      streams.start()

      Runtime.getRuntime.addShutdownHook(new Thread(() => {
        streams.close(10, TimeUnit.SECONDS)
      }))

      //return unit
      ()
    }
  }





}
