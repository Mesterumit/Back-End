const router = require('express').Router()
const query = require('../middlewares/queryHandler')
const userCtrl = require('../controllers/users')
const {isAdmin,isLoggedIn,isOwner} = require('../middlewares/permissions')
const user = require('../models/User')

//Path:  /api/users/
router.route('/')
.get(isAdmin,query(user),userCtrl.list)
.post(isAdmin,userCtrl.create)


// Path : /api/users/:userId
router.route('/:id')
.get(isOwner,userCtrl.read)
.put(isOwner,userCtrl.update)
.delete(isAdmin,userCtrl.delete)

module.exports = router