const router = require('express').Router()

// Path: /auth
router.use('/auth', require('./auth'));
//  Path: /user
router.use('/users', require('./user'));
//  Path: /tokens
router.use('/tokens', require('./token'));
//  Path: /car
router.use('/cars', require('./car'));
//  Path: /reservations
router.use('/reservations', require('./reservation'));
//  Path: /documents
router.use('/documents', require('./document'));


module.exports = router