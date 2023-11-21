const router = require('express').Router()
const authCtrl = require('../controllers/auth')
const {isLoggedIn} = require('../middlewares/permissions')
router.post('/login', authCtrl.login)
router.post('/register', authCtrl.register)
router.all('/logout',isLoggedIn, authCtrl.logout)

module.exports = router;