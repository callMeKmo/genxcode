// modules:

const express = require('express')
const router = express.Router()
const controller = require('../controllers/books')

// books get requests:

router.get('/all', controller.all)

router.get('/:book', controller.preview)

router.get('/:book/:chapter', controller.chapter)

router.get('/:book/modify', controller.modify)

//export books router:

module.exports = router