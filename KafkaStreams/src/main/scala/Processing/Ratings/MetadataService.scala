package Processing.Ratings

import org.apache.kafka.streams.KafkaStreams
import org.apache.kafka.streams.state.StreamsMetadata
import java.util.stream.Collectors
import Entities.HostStoreInfo
import org.apache.kafka.common.serialization.Serializer
import org.apache.kafka.connect.errors.NotFoundException
import scala.collection.JavaConverters._


/**
  * Looks up StreamsMetadata from KafkaStreams
  */
class MetadataService(val streams: KafkaStreams) {


   /**
    * Get the metadata for all of the instances of this Kafka Streams application
    *
    * @return List of { @link HostStoreInfo}
    */
  def streamsMetadata() : List[HostStoreInfo] = {

    // Get metadata for all of the instances of this Kafka Streams application
    val metadata = streams.allMetadata
    return mapInstancesToHostStoreInfo(metadata)
  }


  /**
    * Get the metadata for all instances of this Kafka Streams application that currently
    * has the provided store.
    *
    * @param store The store to locate
    * @return List of { @link HostStoreInfo}
    */
  def streamsMetadataForStore(store: String) : List[HostStoreInfo] = {

    // Get metadata for all of the instances of this Kafka Streams application hosting the store
    val metadata = streams.allMetadataForStore(store)
    return mapInstancesToHostStoreInfo(metadata)
  }


  /**
    * Find the metadata for the instance of this Kafka Streams Application that has the given
    * store and would have the given key if it exists.
    *
    * @param store Store to find
    * @param key   The key to find
    * @return { @link HostStoreInfo}
    */
  def streamsMetadataForStoreAndKey[T](store: String, key: T, serializer: Serializer[T]) : HostStoreInfo = {
    // Get metadata for the instances of this Kafka Streams application hosting the store and
    // potentially the value for key
    val metadata = streams.metadataForKey(store, key, serializer)
    if (metadata == null)
      throw new NotFoundException(
        s"No metadata could be found for store : ${store}, and key type : ${key.getClass.getName}")

    HostStoreInfo(metadata.host, metadata.port, metadata.stateStoreNames.asScala.toList)
  }


  def mapInstancesToHostStoreInfo(metadatas : java.util.Collection[StreamsMetadata]) : List[HostStoreInfo] = {

    metadatas.stream.map[HostStoreInfo](metadata =>
      HostStoreInfo(
        metadata.host(),
        metadata.port,
        metadata.stateStoreNames.asScala.toList))
      .collect(Collectors.toList())
      .asScala.toList
  }

}
