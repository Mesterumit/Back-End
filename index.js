"use strict"

const express = require('express')
//db connection
const { dbConnection } =require('./src/configs/dbConnection')

const app = express()

require('dotenv').config()
const PORT = process.env.PORT || 8000


dbConnection()

// Accept JSON
app.use(express.json())

// user route
app.use('/users',require('./src/routes/user'))
// order
// app.use('/orders', require('./))


app.listen(PORT, ()=>{
    console.log('http://127.0.0.1' + PORT)
})