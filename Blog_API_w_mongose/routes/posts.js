const router = require('express').Router()
const postController = require('../controllers/posts')
const {isAdmin,isLoggedIn} = require('../middlewares/permissions')
const query = require('../middlewares/queryHandler')
const Post  = require('../models/Post')
//Blog Post Routes

router.route('/')
.get(query(Post,{path:'category user',select:'name role'}),postController.getPosts)
.post(isLoggedIn,postController.postPosts)


// Path /api/posts/:id
router.route('/:id')
.get(postController.getPost)
.put(isLoggedIn,postController.putPost)
.delete(isLoggedIn,postController.deletePost)

module.exports = router;