docker rm rating-producer
docker rm rating-processing
docker rm madcapidea-kafka
docker rm madcapidea-zookeeper

docker rmi -f rating-producer
docker rmi -f rating-processing

cd rating-producer
docker build --no-cache -t rating-producer .
cd.. 
cd rating-processing
docker build --no-cache -t rating-processing .
cd..
docker-compose up --force-recreate