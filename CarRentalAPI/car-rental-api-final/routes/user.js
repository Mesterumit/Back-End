const router = require('express').Router()
const query = require('../middlewares/query')
const userCtrl = require('../controllers/user')
const {isAdmin, isLogin}  = require('../middlewares/permisions')
const User = require('../models/User')



// path: /users/verify
router.get('/verify', userCtrl.verify)

// path: /users
router.route('/')
.get(isAdmin, query(User), userCtrl.list)
.post(userCtrl.create)

// path: /users/:id
router.route('/:id')
.get(isLogin, userCtrl.read)
.put(isLogin, userCtrl.update)
.patch(isLogin, userCtrl.update)
.delete(isAdmin, userCtrl.delete)

module.exports = router