const {Schema, model}= require('mongoose')

const DepartmentSchema = new Schema({
    name:{
        type:String,
        trim:true, 
        required: [true, 'Department name is required'], 
        unique: true
    }
}, {timestamps:true})


module.exports = model('Department', DepartmentSchema)