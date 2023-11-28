const User = require('../models/User');
const Token = require('../models/Token');


module.exports = async(req, res, next)=>{
    const auth = req.headers?.authorization || null;
    const tokenKey = auth? auth.split(' ')[1]: null;   //Berar 234235634564556

    if(tokenKey){
        const tokenData = await Token.findOne({token: tokenKey })
        if(tokenData) req.user = await User.findOne({_id: tokenData.userId})
    }
next()
}