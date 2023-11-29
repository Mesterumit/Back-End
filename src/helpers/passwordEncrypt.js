"use stcrict"

const crypto = require('crypto'),
     keyCode = process.env.SECRET_KEY,
     loopCount = 10_000,
     charCount = 32,
     encType = 'sha256';

module.exports = function(password){
    return crypto.pbkdf2Sync(password,keyCode,loopCount,
        // The derived key is then converted to a hexadecimal ('hex')string using 
        charCount,encType).toString('hex');
}    



  
