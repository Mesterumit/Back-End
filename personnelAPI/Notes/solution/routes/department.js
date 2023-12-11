const router = require('express').Router()
const deptCtrl = require('../controllers/department')
const query = require('../middlewares/query')
const Department = require('../models/Department')
router.route('/')
.get(query(Department), deptCtrl.getDepartments)
.post(deptCtrl.postDepartment)

router.route('/:deptId')
.get(deptCtrl.getDepartment)
.put(deptCtrl.putDepartment)
.delete(deptCtrl.deleteDepartment);

router.get('/:deptId/personnels', deptCtrl.getPersonnals)



module.exports = router;