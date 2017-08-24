import java.util.Properties
import java.util.concurrent.TimeUnit
import org.apache.kafka.common.serialization._
import org.apache.kafka.streams._
import org.apache.kafka.streams.kstream._
import java.lang.{Double => JavaDouble}

package Processing.Ratings {

  import Entities.Ranking
  import Serialization.JSONSerde
  import Topics.RatingsTopics
  import Utils.Settings

  class RankingByEmailInitializer extends Initializer[JavaDouble] {
    override def apply(): JavaDouble = 0.0
  }

  class RankingByEmailAggregator extends Aggregator[String, JavaDouble,JavaDouble] {
    override def apply(aggKey: String, value: JavaDouble, aggregate: JavaDouble) = {
      aggregate + value
    }
  }



  object RatingStreamProcessingApp extends App {

    run()




    private def run() : Unit = {
      val stringSerde = Serdes.String
      val doubleSerde = Serdes.Double
      val rankingSerde = new JSONSerde[Ranking]
      val builder: KStreamBuilder = new KStreamBuilder
      val rankings = builder.stream(stringSerde, rankingSerde, RatingsTopics.RATING_SUBMIT_TOPIC)
      val mappedRankings = rankings
        .map[String, JavaDouble]((k,v) => new KeyValue[String, JavaDouble](k,v.score))

      //Alternative to this would be
      //
      //    class RankingByEmailReducer extends Reducer[JavaDouble] {
      //      override def apply(value1: JavaDouble, value2: JavaDouble): JavaDouble = {
      //        value1 + value2
      //      }
      //    }
      //
      //    val wordCounts = mappedRankings.groupByKey(stringSerde, doubleSerde).reduce(new RankingByEmailReducer)
      //
      val wordCounts = mappedRankings.groupByKey(stringSerde, doubleSerde).aggregate(
        new RankingByEmailInitializer(),
        new RankingByEmailAggregator(),
        doubleSerde
      )

      wordCounts.toStream.print()

      //To test this with Console-Consumer, can do something like
      //kafka-console-consumer.bat --zookeeper localhost:2181 --topic rating-output-topic
      // --from-beginning --formatter kafka.tools.DefaultMessageFormatter
      // --property print.key=true
      // --property key.deserializer=org.apache.kafka.common.serialization.StringDeserializer
      // --property value.deserializer=org.apache.kafka.common.serialization.DoubleDeserializer
      //wordCounts.to(stringSerde, doubleSerde ,RatingsTopics.RATING_OUTPUT_TOPIC)

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
