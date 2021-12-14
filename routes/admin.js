// modules:

const express = require('express')
const router = express.Router()
const middlewares = require('../middlewares/checkAuth')
const controller = require('../controllers/admin')

// admin get requests:

router.use(middlewares.auth,middlewares.admin)

router.get('/reports', controller.reports)

router.get('/orders', controller.orders)

router.get('/users', controller.users)

router.get('/analysis', controller.analysis)

router.get('/log', controller.log)

router.get('/loadData/:type/:date', controller.daData)

router.get('/inspect/:type/:id', controller.daDoc)

// admin post requests:

router.post('/users/:id', middlewares.owner, controller.usersChange)

router.delete('/users/:id', controller.usersRemove)

//export admin router:

module.exports = router