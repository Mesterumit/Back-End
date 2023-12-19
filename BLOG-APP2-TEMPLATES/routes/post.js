const router = require('express').Router();
const ctrl = require('../controllers/post')

router.get('/',ctrl.getPosts)
router.get('/post/create', ctrl.getAddForm)

module.exports = router