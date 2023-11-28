const User = require('../models/User');
const Token = require('../models/Token');
const generateToken = require('../utils/generateToken')

exports.login = async(req, res)=>{

    const {username, email, password} = req.body
    if(!(username|| email)&&password){
        res.errorStatusCode = 401;
        throw new Error('Please enter username/email and password')
    }
    // Find the user 
    const user = await User.findOne({$or:[{username}, {email}]})

    // Check password 
    const isMatched = await user.matchPassword(password)
    if(!isMatched){
        res.errorStatusCode = 401;
        throw new Error('Wrong password or username/email')
    }

    // Find if the user still active
    if(!user.isActive){
        res.errorStatusCode = 401;
        throw new Error('Account is not active');
    }

    // Check the Token 
    let tokenData = await Token.findOne({userId: user._id})
    if(!tokenData){
        // Create Token 
        const tokenKey =  generateToken(user._id+Date.now())
        tokenData = await Token.create({userId: user._id, token: tokenKey})
    }
    res.status(200).json({
        error: false, 
        token: tokenData.token,
        user,
    })
    

}


exports.logout = async(req, res)=>{
    const auth = req.headers?.authorization || null;
    const tokenKey = auth? auth.split(' ')[1]: null;   //Berar 234235634564556

    // Delete the token from database 
    const tokenData = await Token.deleteOne({token: tokenKey})
    res.status(204).json({
        error: false, 
        message:'Successfully Logged Out',
        data: tokenData
    })

}