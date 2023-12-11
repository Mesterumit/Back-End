// MongoDB connection with database 
const {connect} = require('mongoose')

const connectDB = async()=>{
   const conn =  await connect(process.env.MONGO_URI);
   console.log(`Connected to DB ${conn.connection.host}`.yellow.underline)
}

module.exports = connectDB