
// module.exports =(err,req,res,next)=>{

//     return res.status(res?.errorStatuscode || 500).send({
//         error:true,
//         message:err.message,
//         cause:err.cause,
//         body:req.body
//     })
// }

const ErrorResponse = require('../utils/ErrorResponse')

const errorHandler = (err, req,res, next) =>{

    let error ={...err}
    // error.message = err.message This line copies
    //  the message property from the original err object
    //   to the error object. This step might be taken to 
    //   ensure that the error object has its own message
    //    property or to customize the error message further.
    error.message = err.message


    // Mongoose bad objectId
    if(error.name === 'CastError'){
        const message = `Resource not found with id ${error.value}`
        error = new ErrorResponse(404, message)
    }

    // Mongoose valdation errors

    if(error.name === 'ValidationError'){
        // Object.values(err.errors): This part of the code 
        // retrieves an array of all the values of the properties
        //  of the err.errors object. This is useful because the
        //  err.errors object likely contains multiple validation
        // errors, and you want to extract the error messages
        //  associated with each validation error.
        console.log(error.errors)

        const message = Object.values(error.errors).map(val =>val.message)
        error = new ErrorResponse(404, message)
    }

    res.status(error.statusCode || 500).json({
        success:false,
        error: error.message || 'Server Error'
    })

}

module.exports = errorHandler