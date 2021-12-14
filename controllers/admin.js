//modules

const Order = require('../models/order')
const Log = require('../models/log')
const Report = require('../models/report')
const User = require('../models/user')
const DataLoader = require('../middlewares/dataLoader')

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
            
            DataLoader.data(Report,res,req.params.date,50)
        break
        case 'order':
            DataLoader.data(Order,res,req.params.date,50)
        break
        case 'log':
            DataLoader.data(Log,res,req.params.date,50)
        break
        case 'user':
            DataLoader.data(User,res,req.params.date,30)
        break
        default:
            res.cookie('note',`err-2000`)
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
            res.cookie('note',`err-2001`)
            res.redirect('/')
    }
}

exports.usersChange = async(req,res)=>{
    const user = await User.findById(req.params.id).exec()
    if (user){
        user.type = req.body.type
        await user.save()
        const log = new Log({
            card:'admin added',
            action:`${user.email} have become an admin! date: ${Date.now()}`
        })
        await log.save()
        res.redirect('/a/users')
    } else {
        res.cookie('note','err-2100')
        res.redirect('/a/analysis')
    }
}

// remove user requst:

exports.usersRemove = async(req,res)=>{
    const user = await User.findById(req.params.id).exec()
    if (user){
        if (req.userInfo === 'owner' || req.userInfo === 'developer'){
            await user.remove()
        } else {
            if (user.type !== "admin"){
                await user.remove()
            } else {
                res.cookie('note','only server owner have access for this')
                res.redirect('/a/analysis')
            }
        }
    } else {
        res.cookie('note','err-2102')
        res.redirect('/a/analysis')
    }
}

//data loader

async function dataLoader(obj,res,date,limit){
    const data = await obj.find().sort({ createdAt: 'desc' }).limit(limit).lte('createdAt',date).exec()
    const count = await obj.estimatedDocumentCount({}).exec()
    var miData = []
    data.forEach(obj=>{
        miData[miData.length] = {id:obj.id,title:obj.card}
        if (miData.length == 20){
            res.json({results:miData,total:count})
        }
    })
}