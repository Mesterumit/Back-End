const {body} = require('express-validator')


exports.loginValidation =(req,res,next)=>{
    return[
        body('email').notEmpty().withMessage('Please enter email').isEmail().withMessage('Please Enter a valid email'),
        body('password').notEmpty().withMessage('Please enter password').isLength({min:4}).withMessage('Password is 4 characters min')
    ]
    
}