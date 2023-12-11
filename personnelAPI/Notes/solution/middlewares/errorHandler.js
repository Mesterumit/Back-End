const ErrorReponse = require('../utils/ErrorResponse');

const errorHandler = (err, req, res, next)=>{
    let error = {...err}
    error.message = err.message
    console.log(err.stack.red);
    // Mongoose bad objectId 
    if(err.name==='CastError'){
        const message = `Resource not found with id of ${err.value}`
        error = new ErrorReponse(404, message)
    }

    // Mongoose duplicate key 
    if(err.code===11000){
        const message = `Duplicate field value entered`
        error = new ErrorReponse(400, message)
    }

    // Mongoose Validation errors, 
    if(err.name==='VaidationError'){
        const message = Object.values(err.errors).map(item=> item.message)
        error = new ErrorReponse(400, message)
    }


    res.status(error.statusCode|| 500)
    .json({
        success:false, 
        error: error.message || 'Server internal Error'
    })
}

module.exports = errorHandler;