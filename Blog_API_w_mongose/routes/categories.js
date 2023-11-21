const router = require('express').Router()
const catController = require('../controllers/categories')
const {getCategoryPosts} = require('../controllers/posts')
const {isAdmin} = require('../middlewares/permissions')
const query = require('../middlewares/queryHandler')
const categories = require('../models/Category')
// Blog Category Routes

//Router middleware
router.use(isAdmin)

router.route('/')
.get(query(categories),catController.getCategories)
.post(catController.postCategory)


router.route('/:id')
.get(catController.getCategory)
.put(catController.putCategory)
.delete(catController.deleteCategory)

// Blog CategoryPost
// it is in that way because, before we post anything , we should pick the category
// after getting category "_id", we can post anything in it

router.get('/:id/posts',getCategoryPosts);

module.exports = router;