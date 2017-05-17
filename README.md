# MadCapIdea
A collection of stories which will lead to an uber simple uber type application (using react/kafka/akka/play)

A full description of what I am trying to do can be found at my blog : https://sachabarbs.wordpress.com/2017/05/01/madcap-idea/

## What Am I Trying To Write

In essence I want to write a very (pardon the pun) but uber simple “uber” type app. Where there are the following funtional requirements

- There should be a web interface that a client can use. Clients may be a “driver” or a “pickup client” requireing a delivery
- There should be a web interface that a “pickup client” can use, that shows a “pickup client” location on a map, which the “pickup client” choses. 
  - The “pickup client” may request a pickup job, in which case “drivers” that are in the area bid for a job. 
  - The “pickup client” location should be visible to a “driver” on a map
- A “driver” may bid for a “pickup client” job, and the bidding “driver(s)” location should be visible to the “pickup client”.
- The acceptance of the bidding “driver” is down to the “pickup client”
- Once a “pickup client” accepts a “driver” ONLY the assigned “driver(s)” current map position will be shown to the “pickup client”
- When a “pickup client” is happy that they have been picked up by a “driver”, the “pickup client” may rate the driver from 1-10, and the “driver” may also rate the “pickup client” from 1-10.
- The rating should only be available once a “pickup client” has marked a job as “completed”
- A “driver” or a “pickup client” should ALWAYS be able to view their previous ratings. 

## Technologies That I Will Try And Use

- WebPack
- React.js
- React Router
- TypeScript
- Babel.js
- Akka
- Scala
- Play (Scala Http Stack)
- MySql
- SBT
- Kafka
- Kafka Streams

## Tracking Progress Of Stories


I will maintain a list of stories and their sub tasks using Trello here : https://trello.com/b/F4ykCOOM/kafka-play-akka-react-webpack-tasks

### Top Level Stories

#### Web Site


- Create standalone web app structure
- Create webpack config
- Create react googlemap component
- Create Driver / User login component
- Test EventSource from Play back end
- Dependency Injection Into React components
- Prototype screens
- Implement screens statically
- Play Back End


#### Create a back end play app


- Create test Kafka consumer that is able to read from JSON payload from a Kafka topic
- Create test publisher that publishes JSON payload to a Kafka topic
- Create Akka Publisher flow to test EventSource JS call
- Create login API
- Create check ranking API, which will use Kafka Active queries over KTable (or Global KTable) in the materialized streams
- Create publish job API, which will publish out on Kafka publisher where it will send a JSON payload
- Create receive job update API, will read JSON from Kafka Consumer where it will read in JSON payload, with the intention of updating the map of the drivers position
- Create “Accept Job” API which will publish out on Kafka publisher where it will send JSON payload
- Create “Bid for Job” API which will publish out on Kafka publisher where it will send JSON payload
- Create Complete job API, which will publish out on Kafka publisher where it will send a JSON payload
- Create ranking API, which will publish out on Kafka publisher where it will send a JSON payload
- Create publish driver job co-ordinate update API, which will publish out on Kafka publisher where it will send a JSON payload
 
 
#### Kafka Streams


- Create test app that tests out listening to any single Kafka publisher JSON topic, and creates streams app from it, and pushes out to an output topic
- Create a windowed Kafka stream app that will window over all “driver bidding” jobs for a give period, and will output to an output stream, such that all the job bids can be consumed by Kafka Consumer
- Create a paired stream of accepted job (id, client, driver id) and an updated driver position which will come in on a different stream
- Create a ranking streams app which will store a successful ranking in a Kafka Stream KTable
- Create a way to use Active Queries for allowing clients/drivers to query their rankings

