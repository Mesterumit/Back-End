
const express = require('express')

const app = express()
require('dotenv').config()

//accept json
app.use(express.json())

// accessToken Control
app.use(require('./middlewares/authentication'))

// Run logger
app.use(require('./middlewares/logger'))

// res.getModelList():
app.use(require('./middlewares/findSearchSortPage'))

const cors = require('cors')
app.use(cors())

const PORT = process.env.PORT 

// db connection 
const {dbConnection}=(require('./configs/dbConnection'))
dbConnection()

//auth route
app.use('/auth', require('./routes/auth'))
//user
app.use('/users', require('./routes/user'))


//Express Error Hnadler (Custom)
app.use(require('./middlewares/errorHandler.js'))

app.listen(PORT, console.log(`Server is runnning on ${PORT}`))