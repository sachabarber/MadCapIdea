package kafka.topics

object RatingsTopics {
  val RATING_SUBMIT_TOPIC = "rating-submit-topic"
  val RATING_OUTPUT_TOPIC = "rating-output-topic"
}

object JobTopics {
  // this topic is used to publish onto, and also by a consumer to subscribe to
  // it is just used to have a commit log of data for this stream
  val JOB_SUBMIT_TOPIC = "job-submit-topic"
}
