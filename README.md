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

## Picture Says A 1000nd Words

So here is a nice picture which shows the main moving parts

![Overview](/docs/overview.png)

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


#### Depdendencies

This has all been developed on Windows, so these instructions are all about how to get stuff working on Windows

- MongoDB : https://www.mongodb.com/dr/fastdl.mongodb.org/win32/mongodb-win32-x86_64-2008plus-ssl-3.4.6-signed.msi/download
- Confluence Platform 3.3.0 Open Source : http://packages.confluent.io/archive/3.3/confluent-oss-3.3.0-2.11.zip
- SBT
- Java 8 SDK
- Webpack
- Node.Js
- NPM
- IntelliJ IDEA v17.0 community
- Docker for windows
- PowerShell

#### Initial Instructions

This has all been developed on Windows, so these instructions are all about how to get stuff working on Windows

- Download the dependencies above
- Replace the official confluent-3.3.0\bin\windows BAT files with the ones found here : https://github.com/renukaradhya/confluentplatform/tree/master/bin/windows
- Modify the confluent-3.3.0\etc\kafka\zookeeper.properties file to change the *dataDir* to something like *dataDir=c:/temp/zookeeper* 
- Modify the confluent-3.3.0\etc\kafka\server.properties file to uncomment the line *delete.topic.enable=true* 
- Modify the confluent-3.3.0\etc\kafka\server.properties file file to change the *log.dirs* *log.dirs=c:/temp/kafka-logs*





#### How To Run It All

There are quite a few moving peices to this app, and they all need to be running in order for it to all work together.

*1. Update node.js dependencies**
Make sure you have Node.Js installed, and make sure NPM is installed too, also ensure that webpack is globally installed

- Open command line and change to the *MadCapIdea\PlayBackEndApi\FrontEndWebSite\* folder and run *npm install*
- now run *webpack* from same folder


*2. Kafka/Zookeeper etc etc**
You can run the following powershell script to get all the pre-requistites up and running (assuming you have downloaded them all)

- Open PowerShell command line and change to the *PowerShellProject\PowerShellProject\* folder and run *.\RunPipeline.ps1*


*3. Play application*
- Open the SBT/Scala project inside IntelliJ IDEA (you will need the SBT plugin, and Java8 installed on your machine). 
  Open this folder *MadCapIdea\PlayBackEndApi* and run it.You may need to create a run time configuration


*4. Kafka Streams application*
- Open the SBT/Scala project inside IntelliJ IDEA (you will need the SBT plugin, and Java8 installed on your machine). 
  Open this folder *MadCapIdea\KafkaStreams* and run it.You may need to create a run time configuration
  
*5. React*
- Open a browser navigate to http://localhost:9000, and register some users both passenger/driver

I normally follow this set of steps afterwards

- open a tab, login as a passenger that I had created
- go to the "create job" page, click the map, push the "create job" button
- open a NEW tab, login as a new driver, go to the "view job" page
- on the 1st tab (passenger) click the map to push passenger position to driver
- on the 2nd tab (driver) click the map to push driver position to passenger
- repeat last 4 steps for additional driver
- on client tab pick driver to accept, click accept button
- complete the job from client tab, give driver rating
- complete the job from paired driver tab, give passenger rating
- go to "view rating" page, should see ratings

  

  

