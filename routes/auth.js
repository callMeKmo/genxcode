// modules:

const express = require('express')
const router = express.Router()
const controller = require('../controllers/auth')
const middlewares = require('../middlewares/checkAuth')
// auth get requests:

router.get('/:action', controller.action)

router.get('/v/:key', controller.verify)

router.get('/r/v/:key', middlewares.noAuth, controller.resetAction)

router.get('/t/v/re', middlewares.reAuth)

//auth post requests:

router.post('/login', middlewares.noAuth, controller.login)

router.post('/recovery', middlewares.noAuth, controller.recovery)

router.post('/r/v/:key/reset', middlewares.noAuth, controller.reset)

router.post('/signup', middlewares.noAuth, controller.signup)

router.delete('/logout',controller.logout)

//export auth router:

module.exports = router