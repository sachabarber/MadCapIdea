$global:mongoDbInstallationFolder = "C:\Program Files\MongoDB\Server\3.5\bin\"
$global:kafkaWindowsBatFolder = "C:\Apache\confluent-3.3.0\bin\windows\"
$global:kafkaTopics = 'rating-submit-topic','rating-output-topic'



function runPipeLine() 
{
	startZookeeper
	startKafka
	#deleteKafkaTopics
	#createKafkaTopics
    runMongo
}


function startZookeeper() {
	$zookeeperCommandLine = $global:kafkaWindowsBatFolder + "zookeeper-server-start.bat"
	$arguments = $global:kafkaWindowsBatFolder +  "..\..\etc\kafka\zookeeper.properties"
	write-host "zookeeperCommandLine : $zookeeperCommandLine args: $arguments \r\n \r\n"
    start-process $zookeeperCommandLine $arguments -WindowStyle Normal
}


function startKafka() {
	$kafkaServerCommandLine = $global:kafkaWindowsBatFolder + "kafka-server-start.bat" 
	$arguments = $global:kafkaWindowsBatFolder +  "..\..\etc\kafka\server.properties"
	write-host "zookeeperCommandLine : $kafkaServerCommandLine args: $arguments \r\n \r\n"
    start-process $kafkaServerCommandLine $arguments -WindowStyle Normal 
}

#function createKafkaTopics() 
#{
#	Foreach ($topic in $global:kafkaTopics )
#	{

#		$kafkaCommand = $global:kafkaWindowsBatFolder + 
#			'kafka-topics.bat --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic' +
#			' ' + $topic
#		write-host "$kafkaCommand : " + $kafkaCommand
#		Invoke-Expression -Command:$kafkaCommand	

#	}


#    #kafka-topics.bat --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic fast-messages
#}

function deleteKafkaTopics() 
{
    
}

function runMongo() {
	$mongoexe = $global:mongoDbInstallationFolder + "mongod.exe"
	write-host "MongoPath : $mongoexe \r\n \r\n" 
	Start-Process -FilePath $mongoexe  -WindowStyle Normal
}

runPipeLine