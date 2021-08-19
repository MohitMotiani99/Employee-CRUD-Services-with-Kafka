const { json } = require('express')
var express = require('express')
var app = express()
app.use(express.urlencoded({extended:true}))
app.use(express.json())
const fetch = require('node-fetch')

var request = require('request')
hosturl = 'http://localhost:5000/books'

app.set('view-engine','jade')

var server = app.listen(8089,()=>{
    console.log('Service Started')
})

app.get('/bookservice',(req,res)=>{
    request.get({
        header:{'content-type':'application/json'},
        url:'http://localhost:5000/books'
    },(err,response,body)=>{
        if(err)
            throw err
        console.log(response.body)
        //res.send('Request Completed')
        res.render('empRecords.jade',{emprec:response.body})
    })
})
app.post('/bookservice/add',(req,res)=>{
    console.log(req.body)
    //const body={a:1}
    var data = req.body
    data.empsal=parseInt(data.empsal)
    data.empage=parseInt(data.empage)
    request.post({
        headers:{'content-type':'application/json'},
        url:'http://localhost:5000/books/add',
        body: JSON.stringify(data) 
    },(err,response,body)=>{
        if(err)
            throw err
        //console.log(response.body)
        console.log(body)
        res.redirect('/bookservice')
        //res.send('Insertion Request Complete')
    })

    // var ans = async ()=>{
    //         await fetch('http://localhost:5000/books/add',{
    //         method: 'POST',
    //         body :JSON.stringify(req.body),
    //         headers :{'Content-Type': 'application/json'}
    //     })
    // //console.log(ans)
    // }
    // ans().then((resp)=>console.log(resp),err=>console.log(err))
    //res.send('Insert Req')
})
app.post('/bookservice/del',(req,res)=>{

    request.delete({
        headers:{'content-type':'application/json'},
        url:'http://localhost:5000/books/del',
        body: JSON.stringify(req.body)
    },(err,response,body)=>{
        if(err)
            throw err
        //console.log(response.body)
        console.log(body)
        res.redirect('/bookservice')
        //res.send('Deletion Request Complete')
    })
})
app.post('/bookservice/uSal',(req,res)=>{
    var data = req.body
    data.empsal=parseInt(data.empsal)

    
    console.log(typeof req.body.empsal)
    request.patch({
        headers:{'content-type':'application/json'},
        url:'http://localhost:5000/books/uSal',
        body: JSON.stringify(data)
    },(err,response,body)=>{
        if(err)
            throw err
        //console.log(response)
        console.log(body)
        res.redirect('/bookservice')
        //res.send('Updation Request Complete')
    })
})