const multer = require('multer');
module.exports = multer({
    storage: multer.diskStorage({
        destination:'./upload/',
        filename:function(req, file, cb){
            cb(null, file.originalname)
        }
    })
});