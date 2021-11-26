// modules:

const express = require('express')
const router = express.Router()
const controller = require('../controllers/courses')

// courses get requests:

router.get('/all', controller.all)

router.get('/:id', controller.preview)

router.get('/:id/:part', controller.part)

router.get('/:id/modify', controller.modify)

// courses post requests

router.post('/v/add/:id', controller.create)

router.post('/v/update/:id', controller.update)

router.delete('/v/delete/:id', controller.delete)

//export courses router:

module.exports = router