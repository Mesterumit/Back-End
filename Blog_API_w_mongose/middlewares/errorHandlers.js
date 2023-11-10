const ErrorResponse = require('../utils/ErrorResponse')

const errorHandler = (err, req,res,next)=>{
    let error = {...err}
    error.message = err.message
    console.log(error.message);
    console.log(error.stack);

    // Mongoose bad objectId
    if(err.name === 'CastError'){
        const message = `Resource not found with id ${err.value}`
        error = new ErrorResponse(404, message)
    }
    
    //Mongoose validation errors

    if(err.name == 'ValidationError'){
        console.log(err.errors);
        // Object.values(err.errors): This part of the code 
        // retrieves an array of all the values of the properties
        //  of the err.errors object. This is useful because the
        //  err.errors object likely contains multiple validation
        // errors, and you want to extract the error messages
        //  associated with each validation error.

        // .map(val => val.message): The map method allows you
        //  to iterate over each element in the array returned
        //   by Object.values(err.errors). In this case, val 
        //   represents each individual element (or value) from
        //    the array. By using val.message, you are accessing
        //     the message property of each element, which
        //      likely contains the specific error message 
        //      associated with each validation error.
        const message = Object.values(err.errors).map(val => val.message)
        error = new ErrorResponse(404, message)

    }
     res.status(error.statusCode || 500 ).json({
        success : false,
        error: error.message || 'Server Error'
     })
}

module.exports = errorHandler

// In JavaScript, the Object.values() method returns an array
//  containing the enumerable property values of an object. 

// For example, if err.errors looks something like this:

// const err = {
//     errors: {
//       property1: { message: 'Error 1' },
//       property2: { message: 'Error 2' },
//       // more error properties
//     }
//   };
  
//   The Object.values(err.errors) call would return an array:

//   [
//     { message: 'Error 1' },
//     { message: 'Error 2' },
//     // more error objects
//   ]
  