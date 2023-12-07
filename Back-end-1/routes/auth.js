
const router = require('express').Router()
const auth = require('../controller/auth')

router.post('/login', auth.login)
router.post('/refresh', auth.refresh)
router.get('/logout',auth.logout)

module.exports = router