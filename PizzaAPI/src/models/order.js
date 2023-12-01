const {Schema, model} = require('mongoose')

const OrderSchema = new Schema({

    userId:{
        type: Schema.ObjectId,
        ref:'User',
        required:true,

    },
    pizzaId:{
        type: Schema.ObjectId,
        ref:'Pizza',
        required:true,
    },
    size:{
        type:String,
        required:true,
        enum:['Small','Medium','Large','XLarge']
    },
    quantity:{
        type:String,
        required:truw,
        default:1,
    },
    price:{
        type:Number,
        required:true,
        default:0,
    },
    totalPrice:{
        type:Number,
    },
},{timestamps:true})

module.exports = model('Order', OrderSchema)