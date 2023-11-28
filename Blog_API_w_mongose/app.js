// we use the express-async-errors
// so we can use it for all routes
// in that way , i don't need to use "try and catch" in controllers
require('express-async-errors')
const express = require('express')
const connectDB = require('./db')
const morgan = require('morgan')
const session = require('cookie-session')
const mongoSanitize = require('express-mongo-sanitize')
const {rateLimit} = require('express-rate-limit')

const app = express()
require('dotenv').config()

//Configurations
const PORT = process.env.PORT || 8080;
const HOST = process.env.HOST || '127.0.0.01';

// COnnect to DB
 connectDB()

 // Parse JSON requests
app.use(express.json());
// using this if condition to check what kind of stage u are usgin as "MODE"
// In my sutiation , i am using "development"
// when u do "morgan("dev"), u will get the difirint out put in terminal
// when u update the data in browser or mongdo db
if(process.env.MODE = 'developmetn')
// Morgan logger
app.use(morgan('dev'))

//IN THAT WAY WE CAN ACCESS THE "req.session" and u can store anything inside of it
// it is a middleware 
app.use(session({secret:process.env.SECRET})) 

//Security Middleware
// Sanitize Data
app.use(mongoSanitize())
// set security headers
app.use(require('helmet')())
// XSS Attacks for headers
app.use(require('xss-clean')())
//HTTP Param polutuion attack
app.use(require('hpp')())
// Rate limiting
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
	standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
	// store: ... , // Use an external store for consistency across multiple server instances.
})
app.use(limiter)


app.get('/',(req,res)=>{
    res.send('Blog API')
})

// Routes
app.use('/api',require('./routes'))
// console.log("blog",require('./routes/blog.js'))

//Express Error Hnadler (Custom)
app.use(require('./middlewares/errorHandlers.js'))

app.listen(PORT,()=>{
    console.log(`Server is running on PORT:http://${HOST}:${PORT} `)
})