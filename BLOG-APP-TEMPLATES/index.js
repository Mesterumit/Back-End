const express = require('express')
const app = express()
require('colors')

require('dotenv').config()


//Configrations
const PORT = process.env.PORT || 8080
const MODE = process.env.MODE || 'production';
const HOST= process.env.HOST || '127.0.01';


// configurat ejs
app.set('view engine', 'ejs')
app.set('views','./views')


//connect to db
require('./db')()

app.get('/',(req,res)=>{
    res.render('home',{user:'Jhon Doe', docTitle:'Home Page!'})
})


app.listen(PORT, console.log(`Server is running on ${MODE} mode at http://${HOST}:${PORT}`.blue))