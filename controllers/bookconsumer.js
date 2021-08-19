var {Kafka} = require('kafkajs')

var kafka = new Kafka({brokers:['localhost:9092']})
var consumer = kafka.consumer({groupId:'bookservice'})


consumer.connect()
consumer.subscribe({topic:'mymessage-service'})
consumer.run({
    eachMessage:async(data)=>{
        console.log(data.message.value.toString())
    }
})