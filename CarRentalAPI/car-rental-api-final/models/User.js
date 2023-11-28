const {Schema, model} = require('mongoose');
const { hash, compare, genSalt} = require('bcryptjs')

const userSchema = new Schema({
    username: {
        type: String, 
        trim: true, 
        required:true, 
        unique: true
    }, 
    password: {
        type: String, 
        trim: true, 
        required:true,
        match: [/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/g, 'Password is invalid'] 
    }, 
    email: {
        type: String, 
        trim: true, 
        required: true, 
        unique: true, 
        match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,'Provide correct email']
    },
    emailVerified: {
        type: Boolean, 
        default: false
    }, 
    firstName: {
        type: String, 
        trim: true, 
        required: true
    }, 
    lastName: {
        type: String, 
        trim: true, 
        required: true
    }, 
    isActive:{
        type: Boolean, 
        default: true
    },
    isAdmin: {
        type: Boolean, 
        default: false
    }

}, {timestamps: true});


userSchema.pre('save', async function(next){
    const salt = await genSalt(12)
    this.password = await hash(this.password, salt);

    next();
})

userSchema.methods.matchPassword = function(enteredPassword){

    return compare(enteredPassword, this.password)
}

module.exports = model('User', userSchema) 