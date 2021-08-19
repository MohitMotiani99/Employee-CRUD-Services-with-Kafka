var {Kafka} = require('kafkajs')

//run().then(()=>console.log('Done'),err=>console.log(err))

module.exports = async function run(data){
    var kafka = new Kafka({brokers:['localhost:9092']})

    var producer = kafka.producer()
    await producer.connect()

    await producer.send({
        topic:'mymessage-service',
        messages:[
            {value:data}
        ]
    })
}

