// modules:

const express = require('express')
const router = express.Router()
const middlewares = require('../middlewares/checkAuth')
const controller = require('../controllers/user')

// user get requests:

router.get('/profile', controller.profile)

router.get('/library/:type', middlewares.auth, controller.library)

router.get('/mailbox', middlewares.auth, controller.mailbox)

//export user router:

module.exports = router