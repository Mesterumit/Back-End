const router = require('express').Router()
const {isAdmin}= require('../middlewares/permisions')
const tokenCtrl = require('../controllers/token');

router.use(isAdmin)

router.route('/')
.get(tokenCtrl.list)
.post(tokenCtrl.create)

router.route('/:id')
.get(tokenCtrl.read)
.put(tokenCtrl.update)
.patch(tokenCtrl.update)
.delete(tokenCtrl.delete);

module.exports = router