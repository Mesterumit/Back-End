const ErrorResponse = require('../utils/ErrorResponse')
const User = require('../models/User')
//const {hash, genSalt} = require(bcryptjs)
const {validationResult} = require('express-validator')

// @URL POST /api/auth/login
// @desc Login a User
// @Access Public
exports.login =async(req,res)=>{
    
    // it is coming from "express-validation" documentry
    // all of these code are coming from "express-validator"
    const results = validationResult(req)
    if(!results.isEmpty()){
        // so result is an object 
        // i am getting the "errors" from results object
        let {errors} = results;
        // in here making them as strings
        // where i have created in validation as message
        // so i can see them as string by "," in postman
        erros = errors.map(err => err.msg).jin(' , ')
        throw new ErrorResponse(422, errors) 
    }

    console.log(result)
    // Find the user in DB
    // findOne will give u back an object
    const user = await User.findOne({email:req.body.email})
    if(!user) throw new ErrorResponse(401, 'Invalid Credentials')

    // ceheck the pasword if matching teh password in DB
    // i want to use the compare methdo the check the password
    // because, i stored the password enycripted in db
    // but user will put in a plain string
    // this will give me a true or false
    const isMatch = await user.matchPassword(req.body.password)
   // if not matching password throw an Error
   if(!isMatch) throw new ErrorResponse(401, 'Invalid Credentials')

   req.session.user = user;
   req.session.isLogin = true;

   res.status(200).json({
    success :true,
    data : user,
    session: req.session
   })




}

// @URL POST /api/auth/register
// @desc Register a User
// @Access Public
exports.register =async(req,res)=>{

    // this is onother way of doing the password
    // but i did it in user'model 
    // const paswword = req.body.password;
    // the number in it shows how many round the will go to generate the password
    // 23v213b23
    // const salt = genSalt(12)
    // const hashedPassword = hash(password, salt)
    // req.body.password = hashedPassword;

    const user = await User.create(req.body)
    //Login the user
    req.session.user = user;
    req.session.isLoggedIn = true;

    // send a response back
    res.status(201).json({
        succes: true,
        data:user,
       // it is sending the entire session object 
        //as part of the JSON response to the client.
        session :req.session
    })



}

// @URL POST /api/auth/logout
// @desc Logout a User
// @Access Private
exports.logout =async(req,res)=>{

req.session = null
res.status(200).json({
    succes:true,
    message:"Successfully loged out"
})

}