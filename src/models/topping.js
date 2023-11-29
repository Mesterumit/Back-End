const {Schema, model} = require('mongoose')

const ToppingSchema = new Schema({

    name:{
        type:String,
        trim:true,
        required:true,
        unique:true,
        
    },
},{timestamps:true})

module.exports = model('Topping', ToppingSchema)