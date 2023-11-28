const router = require('express').Router()
const query = require('../middlewares/query')
const reservCtrl = require('../controllers/reservation')
const {isAdmin, isLogin}  = require('../middlewares/permisions')
const Reservation = require('../models/Reservation')

router.route('/')
.get(isLogin, query(Reservation, {path:'userId carId'}), reservCtrl.list)
.post(isLogin, reservCtrl.create)

router.route('/:id')
.get(isLogin, reservCtrl.read)
.put(isAdmin, reservCtrl.update)
.patch(isAdmin, reservCtrl.update)
.delete(isAdmin, reservCtrl.delete)




module.exports = router