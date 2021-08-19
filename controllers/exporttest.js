var run = require('./bookproducer')

run(JSON.stringify({'myname':'mohit','company':'telstra'})).then(()=>console.log('Done by importing'),err=>console.log(err))