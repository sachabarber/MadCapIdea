$global:mongoDbInstallationFolder = "C:\Program Files\MongoDB\Server\3.5\bin\"
$global:kafkaWindowsBatFolder = "C:\Apache\confluent-3.3.0\bin\windows\"
$global:kafkaTopics = 
	"rating-submit-topic",
	"rating-output-topic"
$global:ProcessesToKill = @()



function RunPipeLine() 
{
	WriteHeader "STOPPING PREVIOUS SERVICES"
	DeleteKafkaTopics
	StopZookeeper
	StopKafka

	Start-Sleep -s 20
	
	WriteHeader "STARTING NEW SERVICE INSTANCES"
	StartZookeeper
	StartKafka
	CreateKafkaTopics
    RunMongo

	WaitForKeyPress

	WriteHeader "KILL PROCESSES CREATED BY SCRIPT"
	KillProcesses
}

function WriteHeader($text) 
{
	write-host "========================================`r`n"
	write-host "$text`r`n"
	write-host "========================================`r`n"
}

function DeleteKafkaTopics() 
{
	Foreach ($topic in $global:kafkaTopics )
	{
		$kafkaCommandLine = $global:kafkaWindowsBatFolder + "kafka-topics.bat"
		$arguments = " --zookeeper localhost:2181 --delete --topic $topic"
		write-host "[0] Delete Kafka Topic Command Line : $kafkaCommandLine args: $arguments `r`n"
		$global:ProcessesToKill += start-process $kafkaCommandLine $arguments -WindowStyle Normal -PassThru
	}
}

function StopZookeeper() {
	$zookeeperCommandLine = $global:kafkaWindowsBatFolder + "zookeeper-server-stop.bat"
	write-host "[1] Zookeeper Command Line : $zookeeperCommandLine`r`n"
    $global:ProcessesToKill += start-process $zookeeperCommandLine -WindowStyle Normal -PassThru
}

function StopKafka() {
	$kafkaServerCommandLine = $global:kafkaWindowsBatFolder + "kafka-server-stop.bat" 
	write-host "[2] Kafka Server Command Line : $kafkaServerCommandLine`r`n"
    $global:ProcessesToKill += start-process $kafkaServerCommandLine  -WindowStyle Normal -PassThru
}

function StartZookeeper() {
	$zookeeperCommandLine = $global:kafkaWindowsBatFolder + "zookeeper-server-start.bat"
	$arguments = $global:kafkaWindowsBatFolder +  "..\..\etc\kafka\zookeeper.properties"
	write-host "[0] Zookeeper Command Line : $zookeeperCommandLine args: $arguments `r`n"
    $global:ProcessesToKill += start-process $zookeeperCommandLine $arguments -WindowStyle Normal -PassThru
}

function StartKafka() {
	$kafkaServerCommandLine = $global:kafkaWindowsBatFolder + "kafka-server-start.bat" 
	$arguments = $global:kafkaWindowsBatFolder +  "..\..\etc\kafka\server.properties"
	write-host "[1] Kafka Server Command Line : $kafkaServerCommandLine args: $arguments `r`n"
    $global:ProcessesToKill += start-process $kafkaServerCommandLine $arguments -WindowStyle Normal -PassThru
}

function CreateKafkaTopics() 
{
	Foreach ($topic in $global:kafkaTopics )
	{
		$kafkaCommandLine = $global:kafkaWindowsBatFolder + "kafka-topics.bat"
		$arguments = " --zookeeper localhost:2181 --create  --replication-factor 1 --partitions 1 --topic $topic"
		write-host "[2] Create Kafka Topic Command Line : $kafkaCommandLine args: $arguments `r`n"
		$global:ProcessesToKill += start-process $kafkaCommandLine $arguments -WindowStyle Normal -PassThru
	}
}

function RunMongo() {
	$mongoexe = $global:mongoDbInstallationFolder + "mongod.exe"
	write-host "[3] Mongo Command Line : $mongoexe `r`n" 
	$global:ProcessesToKill += Start-Process -FilePath $mongoexe  -WindowStyle Normal -PassThru
}


#    #kafka-topics.bat --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic fast-messages
#}



function WaitForKeyPress
{
	Write-Host -NoNewLine "Press any key to continue....`r`n"
	[Console]::ReadKey()
}


function KillProcesses() 
{
	Foreach ($processToKill in $global:ProcessesToKill )
	{
		$name = $processToKill | Get-ChildItem -Name
		write-host "Killing Process : $name `r`n" 
		$processToKill | Stop-Process -Force
	}
}


function DeleteKafkaTopics() 
{
    
}



RunPipeLine