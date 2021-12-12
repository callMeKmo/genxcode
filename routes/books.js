// modules:

const express = require('express')
const router = express.Router()
const middlewares = require('../middlewares/checkAuth')
const controller = require('../controllers/books')

// books get requests:

router.get('/all', controller.all)

router.get('/:book', controller.preview)

router.get('/:id/:chapter', middlewares.auth, controller.chapter)

router.get('/:id/modify',  middlewares.auth, middlewares.admin, controller.modify)

// books post requests

router.post('/v/add/:id', middlewares.auth, middlewares.admin, controller.create)

router.post('/v/update/:id', middlewares.auth, middlewares.admin, controller.update)

router.delete('/v/delete/:id', middlewares.auth, middlewares.admin, controller.delete)

//export books router:

module.exports = router