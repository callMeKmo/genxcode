// modules:

const express = require('express')
const router = express.Router()
const controller = require('../controllers/admin')

// admin get requests:

router.get('/adminpanel', controller.adminpanel)

router.get('/preview', controller.preview)

router.get('/reports', controller.reports)

router.get('/orders', controller.orders)

router.get('/users', controller.users)

router.get('/analysis', controller.analysis)

router.get('/log', controller.log)

//export admin router:

module.exports = router