const {Schema, model}= require('mongoose')
const bcrypt = require('bcryptjs')

const PersonnelSchema = new Schema({

    departmentId:{
        type: Schema.Types.ObjectId,
        ref:'Department',
        required: true
    },
    username:{
        type: String, 
        trim: true, 
        required: [true, 'Username is required'],
        unique: true
    }, 
    password:{
        type:String, 
        trim: true, 
        required: [true, 'Password is required'], 
    },
    firstName:{
        type:String, 
        trim: true, 
        required: [true, 'FirstName is required'], 
    },
    lastName:{
        type:String, 
        trim: true, 
        required: [true, 'Lastname is required'], 
    },
    phone:{
        type:String, 
        trim: true, 
        required: [true, 'Phone number is required'], 
    },
    email:{
        type:String, 
        trim: true, 
        required: [true, 'Email is required'],
        unique:true, 
        match:[/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g, 'Please add a valid email']
    },
    title:{
        type:String, 
        trim: true, 
        required: [true, 'Title is required'], 
    },
    salary:{
        type:Number, 
        default: 0
    }, 
    description:{
        type:String, 
        trim: true, 
        default: null
    }, 
    isActive:{
        type: Boolean, 
        default: true
    }, 
    isAdmin:{
        type: Boolean, 
        default: false
    }, 
    isLead:{
        type: Boolean, 
        default: false
    }, 
    startedAt:{
        type: Date, 
        default: Date.now()
    }


}, {timestamps:true})


// Encrypt/Hash passwords 
PersonnelSchema.pre('save', async function(next){
    const hash = await bcrypt.hash(this.password, 12)
    this.password = hash;
    next()
})

PersonnelSchema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password)
}

module.exports = model('Personnel', PersonnelSchema)
