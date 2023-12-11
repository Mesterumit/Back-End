const Personnal = require('../models/Personnal');
const ErrorResponse = require('../utils/ErrorResponse');

// @URL         GET /api/personnals/
// @access      private
// @desc        List all personnals
exports.getPersonnals = async(req, res)=>{
    res.status(200).json(res.results)
} 


// @URL         POST /api/personnals/
// @access      private
// @desc        Create a personnals
exports.postPersonnal = async(req, res)=>{
    const data = await Personnal.create(req.body)
    res.status(201).json({
        success:true, 
        data    
    })
}

// @URL         GET /api/personnals/:persId
// @access      private
// @desc        read a single personnals
exports.getPersonnal = async(req, res)=>{
    const data = await Personnal.findById(req.params.persId);
    res.status(200).json({
        success:true, 
        data
    })
} 

// @URL         PUT /api/personnals/:persId
// @access      private
// @desc        update a single personnals
exports.putPersonnal = async(req, res)=>{
    const data = await Personnal.findByIdAndUpdate(req.params.persId, req.body, {new:true, runValidators:true});
    res.status(202).json({
        success:true, 
        data
    })
} 

// @URL         DELETE /api/personnals/:persId
// @access      private
// @desc        delete a single personnals
exports.deletePersonnal = async(req, res)=>{
    const data = await Personnal.findByIdAndDelete(req.params.persId);
    res.status(204).json({
        success:true, 
        data
    })
} 


// @URL         POST /api/personnals/login
// @access      public
// @desc        login a personnal
exports.postLogin = async(req, res)=>{
    const {username, password} = req.body
    if(!username || !password) 
        throw new ErrorResponse(401, 'Please provide username and password')
    const user = await Personnal.findOne({username})
    if(!user)
        throw new ErrorResponse(401, 'Wrong username or password')

    const isMatched =  await user.matchPassword(password)
    console.log(isMatched)
    if(!isMatched) 
         throw new ErrorResponse(401, 'Wrong username or password')

    // Set session 
    req.session = {id:user._id}
    // Set cookie 
    if(req.body?.rememberMe){
        req.sessionOptions.maxAge = 3*24*60*60*1000  //3 Days 
    }
    res.status(200).json({
        success: true, 
        user
    })
    

}


// @URL         ALL /api/personnals/logout
// @access      private
// @desc        logout a user
exports.logout = async(req, res)=>{
    // clear the session 
    req.session = null
    res.status(200).json({
        success: true, 
        message: 'Logout: session deleted '
    })
}



