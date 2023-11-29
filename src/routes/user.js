
const router = require('express').Router()

const user = require('../controllers/user')

router.route('/')
.get(user.List)
.post(user.create)



module.exports = router