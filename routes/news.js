// modules:

const express = require('express')
const router = express.Router()
const middlewares = require('../middlewares/checkAuth')
const controller = require('../controllers/news')

// news get requests:

router.get('/all', controller.all)

router.get('/preview', controller.preview)

<<<<<<< HEAD
router.get("/v/:id/modify", controller.modify);
=======
router.get('/v/:id/modify',  middlewares.auth, middlewares.admin, controller.modify)
>>>>>>> 9329a8956bc73718b6381602263a5046a3ccd6f2

// news post requests

router.post('/v/add/:id', middlewares.auth, middlewares.admin, controller.create)

router.post('/v/update/:id', middlewares.auth, middlewares.admin, controller.update)

router.delete('/v/delete/:id', middlewares.auth, middlewares.admin, controller.delete)

//export news router:

module.exports = router