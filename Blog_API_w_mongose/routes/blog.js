
const router = require('express').Router()
const catController = require('../controllers/categories')
const postController = require('../controllers/post')


// Blog Category Routes

router.route('/categories')
.get(catController.getCategories)
.post(catController.postCategory)


router.route('/categories/:id')
.get(catController.getCategory)
.put(catController.putCategory)
.delete(catController.deleteCategory)

//Blog Post Routes

router.route('/posts')
.get(postController.getPosts)
.post(postController.postPosts)


router.route('/posts/:id')
.get(postController.getPost)
.put(postController.putPost)
.delete(postController.deletePost)

// Blog CategoryPost
// i can make it in other way such as
// /posts/categories/:id

router.get('/categories/:id/posts',postController.getCategoryPosts);


module.exports = router

