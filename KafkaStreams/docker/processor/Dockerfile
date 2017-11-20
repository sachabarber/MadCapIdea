FROM anapsix/alpine-java

ADD streamsApplication.conf /streamsApplication.conf
ADD KafkaStreams.jar /KafkaStreams.jar

CMD ["java","-cp","KafkaStreams.jar","processing.ratings.RatingStreamProcessingApp"]
