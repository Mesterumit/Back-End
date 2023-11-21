
const router = require('express').Router()

// the use, checking if we have the route such as "categories,posts and auth"
// after checking it is requiring
router.use('/categories', require('./categories'));
router.use('/posts', require('./posts'));
router.use('/auth',require('./auth'));
router.use('/users', require('./user'))

module.exports = router