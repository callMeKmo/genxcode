// modules:

const { request, response } = require('express')
const express = require('express')
const router = express.Router()
const controller = require('../controllers/auth')

// auth get requests:

router.get('/:action', controller.action)

//export auth router:

module.exports = router