const {Schema, model} = require('mongoose')

const psotSchema = Schema({
    userId:{
        type: Schema.ObjectId,
        ref:'User'
    },
    categoryId:{
        type: Schema.ObjectId,
        ref:'Category'
    },
    title:{
        type:String,
        trim:true,
        required:true,
        uniqe:[true,'Post title is required'],
        minlength:3
    },
    content:{
        type:String,
        required:true,
        trim:true,
        uniqe:[true,'Post content is required'],
        maxlength:500
    },
    publish:{
       type:Boolean,
       default:true
    },
    image:{
        type:String,
        default:'/images/no-photo.jpg'

    }
},{timestams:true})
module.exports = model('Post', psotSchema)