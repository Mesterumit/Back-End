const router = require('express').Router()
const tasks = require('../controllers/Tasks')


router.route('/')
.get(tasks.getTasks)
.post(tasks.postTask)


router.route('/:id')
.get(tasks.getTask)
.put(tasks.putTask)
.delete(tasks.deleteTask)

module.exports = router