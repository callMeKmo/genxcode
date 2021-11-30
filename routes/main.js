// modules:

const express = require('express')
const router = express.Router()
const controller = require('../controllers/main')
const url = require('url')

// main get requests:

router.get('/', (req,res,next)=>{console.log(req.cookies.message);next()}, (req,res,next)=>{res.clearCookie('message');next()},controller.home)

router.get('/lab', controller.lab)

router.get('/settings', controller.settings)

router.get('/search/', controller.result)

router.get('/redirect', (req,res)=>{
    res.cookie('message','my message')
    res.redirect('/')
})

//export main router:

module.exports = router