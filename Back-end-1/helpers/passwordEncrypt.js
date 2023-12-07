

const cyrpto = require('crypto')
       keyCode = process.env.SECRET_KEY,
       loopCount = 10_000,
       charCount = 32,
       encType = 'sha512';

module.exports= function(password){
    return cyrpto.pbkdf2Sync(password,keyCode,loopCount,charCount,encType).toString('hex')

}       