const router = require('express').Router()

const carCtrl = require('../controllers/cars');
const {isAdmin} = require('../middlewares/permisions');

const upload = require('../middlewares/upload');

// Path: /cars
router.route('/')
.get(carCtrl.list)
.post(isAdmin, upload.array('images'),carCtrl.create)

// Path: /cars/:id
router.route('/:id')
.get(carCtrl.read)
.put(isAdmin, upload.array('images'), carCtrl.update)
.patch(isAdmin, upload.array('images'), carCtrl.update)
.delete(isAdmin, carCtrl.delete)



module.exports = router