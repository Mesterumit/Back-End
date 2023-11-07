// module.exports = (error, req,res,next) =>{
//     // 500 meas internal server error
//     const errorStatusCode = res.errorStatusCode ?? 500 
//     // if "errorStatusCode " is exist then , it is the best senario
//     // and we will show that as status
//     // so "res" is an object and "errorStatusCode" is just property,variable of "res"
//     res.status(errorStatusCode).send({
//         error:true,
//         message: error.message
//     })
//     next()
// }


module.exports = (err, req, res, next)=>{
    const errorStatusCode = res.errorStatusCode?? 500
    console.log('ErrorHandler runned'.red)
    res.status(errorStatusCode).send({
        error: true, 
        message: err.message
    })
next()
}