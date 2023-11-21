const {Schema, model} = require('mongoose')
const {hash, genSalt, compare} = require('bcryptjs')

const userSchem = new Schema({ 
    name:{
        type: String,
        required: [true,"Please enter a user name"],
        trim:true

    },
    email:{
        type: String,
        required : [true,"Please enter a email"],
        uniqe: true,
        trrim:true,
        // google emailregex for validation
        match:[/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,'Please provide valid email'],
        
        // this is another way of validaton
        // validate:[(email)=>(email.includes('@') && email.includes('.'),'Please provide a valid email')]

      },
    password:{
        type: String,
        required: [true,"Please provide a Password"],
        minlength: [4, 'Password is 4 characters'],
        trim:true

    },
    role:{
        type: String,
        // with enum , we can create two user roles
        enum: ['user', 'publisher','admin'],
        default:'user'

    }

},{timestamps:true})

  // this one is "mongoosejs validation"
// this is the third way of validation by mongoose
// userSchema.path('email').validate(function(){

//     return this.email.includes('@') && this.email.includes('.')
// })

// this is providing by mongoose
// it helps us to store the password encyrpted
// so it wont be plain password in data base
// it will generate for ecah user registration
userSchem.pre('save', async function(next){

const salt = await genSalt(12)
this.password = await hash(this.password, salt)
next()
})

// Compare entered password with hash password
userSchem.methods.matchPassword = function(enteredPassword){
return compare(enteredPassword, this.password)
}

module.exports = model('User', userSchem)