// modules:

const express = require('express')
const router = express.Router()
const controller = require('../controllers/main')

// main get requests:

router.get('/', controller.home)

router.get('/lab', controller.lab)

router.get('/settings', controller.settings)

router.get('/search/', controller.result)

//export main router:

module.exports = router