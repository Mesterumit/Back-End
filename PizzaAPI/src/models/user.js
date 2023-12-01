"use strict"

const {mongoose} = require('../configs/dbConnection')

// const passwordEncrypt = require('../helpers/passwordEncrypt')
const { hash, compare, genSalt} = require('bcryptjs')

const UserSchema = new mongoose.Schema({

    username:{
        type:String,
        trim:true,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        trim:true,
        required:true,
        // set : (password)=> passwordEncrypt(password)
        match : [/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/g, 'Password is invalid']

    },
    email:{
        type:String,
        trim:true,
        required: [true, 'Email fiedl must be ruquired'],
        unique:true,
        validate :[
            (email) => email.includes('@') && email.includes('.'),
            'Email type is not correct.'
        ]

    },
    isActive:{
        type:Boolean,
        default:true,
    },
    isAdmin:{
        type:Boolean,
        default:false,
    },
},{timestamps:true})


userSchema.pre('save', async function(next){
    const salt = await genSalt(12)
    this.password = await hash(this.password, salt);

    next();
})

userSchema.methods.matchPassword = function(enteredPassword){

    return compare(enteredPassword, this.password)
}

module.exports = mongoose.model('User', UserSchema)
