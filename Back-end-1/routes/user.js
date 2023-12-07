const router = require('express').Router()

const User = require('../controller/user')
const auth = require('../middlewares/permissions')

router.route('/')
.get(auth.isLogin,User.list)
.post(User.create)

router.route('/:id')
.get(auth.isLogin,User.read)
.put(auth.isAdmin,User.update)
.delete(auth.isAdmin,User.delete)


module.exports = router