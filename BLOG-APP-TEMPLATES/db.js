const {connect} = require('mongoose')

module.exports = async function(){
    try{
        const db=await connect(process.env.MONGO)
        console.log(`Connected to DB ${db.connection.host}`.yellow.underline)
    }catch(err){
        console.log(`Couldn't connect to the DB ${err.message}`.red)
    }
}