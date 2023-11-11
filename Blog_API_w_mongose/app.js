const express = require('express')
const connectDB = require('./db')
const morgan = require('morgan')

const app = express()
require('dotenv').config()
const PORT = 8080;
connectDB()

app.use(express.json())
app.get('/',(req,res)=>{
    res.send('Hello Mongoose')
})

// Routes
app.use('/api',require('./routes/blog.js'))
// console.log("blog",require('./routes/blog.js'))

//Express Error Hnadler (Custom)
app.use(require('./middlewares/errorHandlers.js'))

app.listen(PORT,()=>{
    console.log(`Server is running on PORT:${PORT} `)
})