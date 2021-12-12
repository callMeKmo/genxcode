//modules

const Order = require('../models/order')
const Log = require('../models/log')
const Report = require('../models/report')
const User = require('../models/user')

// get adminpanel requst:

exports.adminpanel = (req,res)=>{
    res.render('admin/adminpanel')
}

// get orders requst:

exports.orders = (req,res)=>{
    res.render('admin/orders')
}

// get reports requst:

exports.reports = (req,res)=>{
    res.render('admin/reports')
}

// get log requst:

exports.log = (req,res)=>{
    res.render('admin/log')
}

// get analysis requst:

exports.analysis = (req,res)=>{
    res.render('admin/analysis')
}

// get users requst:

exports.users = (req,res)=>{
    res.render('admin/users')
}

// change user request:

// get 30 report log or order.

exports.daData = async(req,res)=>{
    switch (req.params.type){
        case 'report':
            dataLoader(Report,res,req.params.date)
        break
        case 'order':
            dataLoader(Order,res,req.params.date)
        break
        case 'log':
            dataLoader(Log,res,req.params.date)
        break
        case 'user':
            dataLoader(User,res,req.params.date)
        break
        default:
            res.cookie('note',`${req.params.type} is not a data type`)
            res.redirect('/')
    }
}

//get the document

exports.daDoc = async(req,res)=>{
    switch (req.params.type){
        case 'report':
            const report = await Report.findById(req.params.id).exec()
            res.json(report)
        break
        case 'order':
            const order = await Order.findById(req.params.id).exec()
            res.json(order)
        break
        case 'log':
            const log = await Log.findById(req.params.id).exec()
            res.json(log)
        break
        default:
            res.cookie('note',`${req.params.type} is not a data type`)
            res.redirect('/')
    }
}

exports.usersChange = (req,res)=>{
    // code here
}

// remove user requst:

exports.usersRemove = (req,res)=>{
    // code here
}

//data loader

async function dataLoader(obj,res,date){
    const data = await obj.find().sort({ createdAt: 'desc' }).limit(30).lte('createdAt',date).exec()
    const count = await obj.estimatedDocumentCount({}).exec()
    var miData = []
    data.forEach(obj=>{
        miData[miData.length] = {id:obj.id,title:obj.card}
        if (miData.length == 20){
            res.json({results:miData,total:count})
        }
    })
}