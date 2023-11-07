
// require('colors')
// require('dotenv').config()
// const express = require('express')


// const {connectDB} = require('./db')

//  const errorHandler = require('./middlewares/errorHandler');

// // this is our model
// const Task = require('./models/Tasks')

// // const routerTasks = require('./routes/tasks')
// // our express servise will use it 
// // to enable to POST request
// // if you don't have it u will get a "CORS" ERROR IN BROWSER
// const cors = require('cors')

// const app = express()

// const PORT = process.env.PORT || 8080

// // we call the "connectDB" function
// // that we have import from "db" file to connect it to dataBase
// connectDB()

// // and we have to tell our express app to use "cors"
// // importing is not enough 
// // we should use with "use" key word to use it globaly
// // it runs every end point we will create
// app.use(cors())
// app.use(require('./routes/tasks'));

// app.use(errorHandler)

// app.listen(PORT, ()=>{
//     console.log(`Server is running ${PORT}`.yellow.underline)
// })


// Imports
require('colors')
require('dotenv').config()
const express = require('express');
const {connectDB} = require('./db');
const errorHandler = require('./middlewares/errorHandler');
const Task = require('./models/Tasks')
const cors = require('cors')
 
// Configuration 
const app = express();
const PORT = process.env.PORT || 8080;

// connect to DB
connectDB()

// Parse request 
app.use(cors());
app.use(express.json())
// import routers
app.use(require('./routes/tasks'));

// handle errors
app.use(errorHandler)
// Start the serve 
app.listen(PORT, console.log(`Server is runing on port ${PORT}`.green.underline))
