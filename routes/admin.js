// modules:

const express = require('express')
const router = express.Router()
const controller = require('../controllers/admin')

// admin get requests:

router.get('/adminpanel', controller.adminpanel)

router.get('/reports', controller.reports)

router.get('/orders', controller.orders)

router.get('/users', controller.users)

router.get('/analysis', controller.analysis)

router.get('/log', controller.log)

// admin post requests:

router.post('/users/:id', controller.usersChange)

router.delete('/users/:id', controller.usersRemove)

//export admin router:

module.exports = router