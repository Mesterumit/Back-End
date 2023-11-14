const ErrorResponse = require("../utils/ErrorResponse")

exports.isLoggedIn =(req,res,next)=>{
    if(!req.session?.user)
    throw new ErrorResponse(403,'No Permission: Login First')
    
    next()
}

exports.isOwner = (req,res,next)=>{
    if(req.params.id !== req.session?.user?._id.toString())
      throw new ErrorResponse(403,'No Permisson :Can not access other users resources')
    next()
}

exports.isAdmin =(req,res,next)=>{
    if(req.session?.user?.role !=='admin')
      throw new ErrorResponse(403, 'Admin credintials required ')
    next()
}