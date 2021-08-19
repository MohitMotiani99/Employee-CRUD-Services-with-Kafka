var express = require('express')
var app = express()
app.use(express.urlencoded({extended:true}))
app.use(express.json())

var cors = require('cors')
app.use(cors())

var server = app.listen(5000,()=>{
    console.log('Controller started')
})

var MongoClient = require('mongodb').MongoClient
var url = 'mongodb://127.0.0.1:27017'
var mydb = 'emp'
var collection ='empc'

var run = require('./bookproducer')
const { response } = require('express')

MongoClient.connect(url,(err,db)=>{
    if(err)
        throw err
    dbo = db.db(mydb)
    console.log(dbo)


    // dbo.createCollection(collection,(err,result)=>{
    //     console.log(result)
    //     console.log('collection created')
    // })

    app.get('/books',(req,res)=>{
        dbo.collection(collection).find({}).toArray((err,result)=>{
            console.log(result)
            run('All Employee Data Taken').then(()=>console.log('Message Sent from Controller'),err=>console.log(err))
            //res.send('Sent Data to Producer')
            res.send(result)
        })
    })
    app.post('/books/add',(req,res)=>{
        console.log('request data')
        //console.log(req)
        //console.log(req.json)
        //console.log(req.form)
        console.log(req.body)
        dbo.collection(collection).insertOne(req.body,(err,result)=>{
            if(err)
                throw err
            console.log(result)
            run('DATA INSERTED IS '+JSON.stringify(req.body)).then(()=>console.log('Message sent from Controller'),err=>console.log(err))
            res.send('Data Inserted')
        })
        //res.send('abc')
    })
    app.delete('/books/del',(req,res)=>{
        console.log(req.body)
        dbo.collection(collection).find(req.body).toArray((err,result)=>{
            if(result.length==0)
                res.send('Employee Name Not Found')
            else{
            dbo.collection(collection).deleteMany(req.body,(err,result)=>{
                console.log(result)
                run('RECORDS WITH EMPNAME '+req.body.empname+' DELETED')
                .then(()=>console.log('Message from Controller'),err=>console.log(err))
                res.send('Data Deleted')
            })
          }
        })
    })
    app.patch('/books/uSal',(req,res)=>{
        console.log(typeof req.body.empsal)
        dbo.collection(collection).find({'empname':req.body.empname}).toArray((err,result)=>{
            if(result.length==0)
                res.send('Employee Not Found')
            else{
            dbo.collection(collection).updateMany({'empname':req.body.empname},{$set:{'empsal':req.body.empsal}},(err,result)=>{
                if(err)
                    throw err
                run('SALARY OF RECORDS WITH EMPNAME '+req.body.empname+'  HAS BEEN UPDATED TO '+req.body.empsal)
                .then(()=>console.log('Message from Controller'),err=>console.log(err))
                res.send('Data Updated')
            })
          }
        })
    })
    
})

