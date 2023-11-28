const {Schema, model} = require('mongoose');

const carSchema = new Schema({
    plateNumber:{
        type: String, 
        trim: true, 
        required: true, 
        unique: true
    },
    brand:{
        type: String, 
        trim: true, 
        required: true, 
    }, 
    model:{
        type: String, 
        trim: true, 
        required: true, 
    }, 
    year:{
        type: Number, 
        required: true, 
        min:2000
    }, 
    isAutomatic:{
        type: Boolean, 
        default: false
    },
    pricePerDay:{
        type: Number,
        required: true
    }, 
    isPublish:{
        type: Boolean, 
        default: true, 
    }, 
    images: {
        type: Array, 
        default: []
    }, 
    createdId: {
        type: Schema.Types.ObjectId, 
        ref:'User',
        required: true
    },
    updatedId:{
        type: Schema.Types.ObjectId, 
        ref:'User',
        required: true
    }
}, {timestamps: true});


module.exports = model('Car', carSchema)