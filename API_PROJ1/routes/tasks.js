const router = require('express').Router()

// need to import controller here
// such as
// getOneTask, createNewtTask, updateTask, deleteTask
 const {getTasks,getSingleTask,addNewTask} = require('../controllers/taskController')
 const {checkApiKey} = require('../middlewares/isAuthenticated')

router.get('/', getTasks)
router.get('/:id', getSingleTask)
router.post('/',checkApiKey, addNewTask)
// router.put('/taks/:id', updateTask)
// router.delete('/tasks/:id', deleteTask)

module.exports = router