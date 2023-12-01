const {Schema, model} = require('mongoose')

const PizzaSchema = new Schema({

    name:{
        type:String,
        required:true,
        trim:true,
        unique:true,
    },
    image:{
        type:String,
        trim:true,
    },
    price:{
        type:Number,
        required:true,
    },
    // it is an array of object 
    // because i will store more than one topping
    // for one order
    topping:[ // push, pull
        {
         type: Schema.ObjectId,
         ref:'Topping',
        }
    ]
},{timestamps:true})

module.exports = model('Pizza', PizzaSchema)