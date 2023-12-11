const router = require('express').Router()
const persCtrl = require('../controllers/personnal');
const Personnal = require('../models/Personnal');
const query = require('../middlewares/query');



router.post('/login', persCtrl.postLogin)
router.all('/logout', persCtrl.logout);

router.route('/')
.get(query(Personnal, 'departmentId'), persCtrl.getPersonnals)
.post(persCtrl.postPersonnal)

router.route('/:persId')
.get(persCtrl.getPersonnal)
.put(persCtrl.putPersonnal)
.delete(persCtrl.deletePersonnal)



module.exports = router;