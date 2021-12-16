// modules:

const express = require('express')
const router = express.Router()
const middlewares = require('../middlewares/checkAuth')
const controller = require('../controllers/admin')

// admin get requests:

router.get('/reports', middlewares.auth,middlewares.admin, controller.reports)

router.get('/orders', middlewares.auth,middlewares.admin, controller.orders)

router.get('/users', middlewares.auth,middlewares.admin, controller.users)

router.get('/analysis', middlewares.auth,middlewares.admin, controller.analysis)

router.get('/log', middlewares.auth,middlewares.admin, controller.log)

router.get('/loadData/:type/:date', middlewares.auth,middlewares.admin, controller.daData)

router.get('/inspect/:type/:id', middlewares.auth,middlewares.admin, controller.daDoc)

// admin post requests:

router.post('/users/:id', middlewares.auth,middlewares.admin, middlewares.owner, controller.usersChange)

router.delete('/users/:id', middlewares.auth,middlewares.admin, controller.usersRemove)

//export admin router:

module.exports = router