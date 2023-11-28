const router = require('express').Router()
const authCtrl = require('../controllers/auth')
const {isLoggedIn} = require('../middlewares/permissions')
const {loginValidation} = require('../validation/auth')

router.post('/login',loginValidation(), authCtrl.login)
router.post('/register', authCtrl.register)
router.all('/logout',isLoggedIn, authCtrl.logout)

module.exports = router;