// modules:

const { request, response } = require('express')
const express = require('express')
const router = express.Router()
const controller = require('../controllers/auth')

// auth get requests:

router.get('/:action', controller.action)

router.get('/v/:key', controller.verify)

router.get('/r/v/:key', controller.resetAction)

//auth post requests:

router.post('/login', controller.login)

router.post('/recovery', controller.recovery)

router.post('/r/v/:key/reset', controller.reset)

router.post('/signup', controller.signup)

router.delete('/logout',controller.logout)

//export auth router:

module.exports = router