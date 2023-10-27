// we install that to use ".env" file in our project
require('dotenv').config();

// to make it more colorfull
require('colors')

// it is a library which solve our problem 
// if it is windos then we need to use "\\" back slah
// it is Linux then "//"
// so this library help us to be usibale our code for any operator system
const path = require('path')
// assign express package
const express = require('express'); // express is a function

// access environment variables
const PORT = process.env.PORT || 8080; // short curciuting
const HOST = process.env.HOST || "127.0.0.1" // this numbers are equle to localhost
const MODE = process.env.MODE || "production" // we have  phases, "production and development "


// create the server
const app = express(); // we call the functiont to use 

// routes
// it takes a function and have two parameters
// app.use((req,res)=>{
app.get("/info",(req,res)=>{
    console.log(req)
    const IpAdress = req.socket.remoteAddress;
    console.log("IP ADRESS ", IpAdress)
    console.log("Protocol",req.protocol)
    console.log("Hostname",req.hostname)
    console.log("Method",req.method)
    console.log("URL",req.url)
    console.log("original URL",req.originalUrl)
    console.log("Base URL",req.baseUrl)
    console.log("sub domain",req.subdomains)
    console.log("query",req.query)

    // sending "html"
    // res.send("<h1>Welcome to my API</h1>");

    // sending JSON
    const data = {name:'jhon', surname:'Doe', number :1234};
    // via express no need to do convertion
    // but for NODE-JS u need to convert it 
    // its understand by itself
    // const JSONData = JSON.stringify(data);
    // res.send(JSONData);
    // res.send(data)
    res.status(201).json(data)
});

app.get("/",(req,res)=>{
    // sending "html"
    // res.send("<h1>Welcome to my API</h1>");

    // sending JSON
    const data = {name:'jhon', surname:'Doe', number :1234};
    // via express no need to do convertion
    // but for NODE-JS u need to convert it 
    // its understand by itself
    // const JSONData = JSON.stringify(data);
    // res.send(JSONData);
    // res.send(data)
    res.status(201).json(data)
})

// the second (get) will not executed as it starts checking from 
// top to bottom and as this endpoint and method already covered above
app.get('/',(req,res)=>{
    console.log("this is the second function to cover root url")
})


app.post('/',(req,res)=>{
    res.send(`massage:'This is a post method response`)
});

app.get('/about/',(req,res)=>{
    res.redirect("/")
})

app.get("/html",(req,res)=>{
    // it is more complicated way to reach out another file
    // res.sendFile('//Users//umitmester//GitHub//FullStackk//Back-End//EXPRESS-JS-1//index.html');

    // easy way is 
    console.log(__dirname) 
    // that gives a exact location of the server folder
    // after finding the location we can use it as we did two lines up
    // "\\" slah is for windows
    // "//" it is for "LUNEX"
    //  "//" it is called as forward slash
    res.sendFile(__dirname+"//index.html")
    // here we are gonna use the "path" for all the conflict between different server
    res.sendFile(path.join(__dirname,"index.html"))
})

// look for that to add number in sendStatus
app.get('/status',(req,res)=>{
    res.sendStatus()
})

// app.get('/product/:id',(req,res)=>{
    // we cab get the any id we want
    // in that way we can only get the "id"
    //  const id = res.params.id

//     res.send({message:'Here is the details about product ${id}'})

// })
app.get('/product/:productId',(req,res)=>{
   
    // in that way we will get the productId
    const productId = req.params.productId; 
    if(productId > 10000){
        res.send(
            {message :` This is a invalid ${productId} productId`})
    }else{
        res.send(
            {message :` Here is the details of about product ${productId}`})
    }
   
});

// regex or joker characters 
// app.get(/abc/,(req,res)=>{
//     res.send(
//         {message : 'This regex covers every end point that includes abc in it'})
// })

// this one will cover all "abc" letter but it should start with
app.get(/^abc/,(req,res)=>{
    res.send(
        {message : 'This regex covers every end point that starts with abc'})
})
// this cover the ends with  "$"
app.get(/abc$/,(req,res)=>{
    res.send(
        {message : 'This regex covers every end point that ends with abc'})
})
 

// satart the server
// the first parameter is "PORT" WHICH port u want to start
// one the server runing, we can show the message
app.listen(PORT, ()=>{
    console.log(`server is running in ${MODE} mode on`. yellow,
     `http://${HOST}:${PORT}`.blue.underline)
} ); 




