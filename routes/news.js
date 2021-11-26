// modules:

const express = require('express')
const router = express.Router()
const controller = require('../controllers/news')

// news get requests:

router.get('/all', controller.all)

router.get('/preview', controller.preview)

router.get('/modify', controller.modify)

// news post requests

router.post('/v/add/:id', controller.create)

router.post('/v/update/:id', controller.update)

router.delete('/v/delete/:id', controller.delete)

//export news router:

module.exports = router