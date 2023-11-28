module.exports = (err, req, res, next)=>{
    return res.status(res?.errorStatusCode||500).json({
            error: true, 
            message: err.message,
            body: req.body, 
            stack: err.stack
    })

}