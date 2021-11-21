// modules:

const express = require('express')
const router = express.Router()
const controller = require('../controllers/news')

// news get requests:

router.get('/all', controller.all)

router.get('/preview', controller.preview)

router.get('/modify', controller.modify)

//export news router:

module.exports = router