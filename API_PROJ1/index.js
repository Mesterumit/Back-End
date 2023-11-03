require('dotenv').config()


const express = require('express')
const app = express()

// import routes
const tasksRoutes = require('./routes/tasks')

const PORT = process.env.PORT || 8080

const {errorHandler} = require('./middlewares/erros')
const {logError} = require('./middlewares/logError')


// build-in middlewares
app.use(express.json())

app.use('/api/v1/tasks', tasksRoutes)
// app.use('/api/v1/tasks/', tasksRoutes)


app.use(errorHandler)
app.use(logError)

// app.get('/',(req,res)=>{
//     res.send({message:"it is get response"})
// })
app.listen(PORT, ()=>{
    console.log(`Server running on ${PORT}`)
})
