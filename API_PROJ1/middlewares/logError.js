const logError = (req,res,next)=>{
    const {url, method} = req;
    const timestamp = new  Date().toUTCString(); 

    console.log(`Method: ${method} | URL : ${url} | Timestamp: ${timestamp}`)
    next()
}

module.exports = {logError}