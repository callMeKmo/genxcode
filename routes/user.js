// modules:

const express = require('express')
const router = express.Router()
const controller = require('../controllers/user')

// user get requests:

router.get('/profile', controller.profile)

router.get('/settings', controller.settings)

router.get('/library/:type', controller.library)

router.get('/mailbox', controller.mailbox)

//export user router:

module.exports = router