package stores

import utils.Retry
import org.apache.kafka.streams.KafkaStreams
import org.apache.kafka.streams.state.QueryableStoreType

import scala.concurrent.{ExecutionContext, Future}

object StateStores {
    val RATINGS_BY_EMAIL_STORE = "ratings-by-email-store"

    def waitUntilStoreIsQueryable[T](
        storeName: String,
        queryableStoreType: QueryableStoreType[T],
        streams: KafkaStreams)
        (implicit ec: ExecutionContext): Future[T] = {

        Retry.retry(5) {
            streams.store(storeName, queryableStoreType)
        }(ec)
    }
}




