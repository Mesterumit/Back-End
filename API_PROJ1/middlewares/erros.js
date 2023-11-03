const errorHandler =(err, req, res, next)=>{
    console.log(err.cause)

    res.status(err.cause || 500).send({
        success: false,
        error:err.message
    })
}
module.exports = { errorHandler };