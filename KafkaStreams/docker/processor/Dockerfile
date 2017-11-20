FROM anapsix/alpine-java

ADD streamsApplication.conf /streamsApplication.conf
ADD KafkaStreams.jar /KafkaStreams.jar

EXPOSE 8080

CMD ["java","-cp","KafkaStreams.jar","processing.ratings.RatingStreamProcessingApp"]
