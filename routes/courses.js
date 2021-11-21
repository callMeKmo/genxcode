// modules:

const express = require('express')
const router = express.Router()
const controller = require('../controllers/courses')

// courses get requests:

router.get('/all', controller.all)

router.get('/:course', controller.preview)

router.get('/:course/:part', controller.part)

router.get('/:course/modify', controller.modify)

//export courses router:

module.exports = router