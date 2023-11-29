const router = require('express').Router()
const topping = require('../controllers/topping')
 
router.route('/')
.get(topping.list)