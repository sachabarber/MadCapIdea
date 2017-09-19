FROM anapsix/alpine-java
MAINTAINER sacha barber <sacha.barber@gmail.com>

ADD . /root
WORKDIR /root

EXPOSE 8080

CMD ["java","-cp","StreamProcesing.jar","Processing.Ratings.RatingStreamProcessingApp"]