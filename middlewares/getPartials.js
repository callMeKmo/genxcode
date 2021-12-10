// models

const User = require('../models/user')
const Key = require('../keygen')

// get username

exports.username = async (req,res,next) => {
    if (req.cookies.key) {
        const user = await User.findOne({passkey: req.cookies.key}).exec()
        if (user != null) {
            res.locals.username = user.username
            res.locals.email = user.email
        }
    }
    next()
}

// get notifications

exports.notification = (req,res,next) => {
    if (req.cookies.note) {
        const note = req.cookies.note
        if (note != null) {
            res.locals.note = note
            res.clearCookie('note')
        }
    }
    next()
}

exports.key = async(req,res,next)=>{
    if (req.cookies.key) {
        const key = req.cookies.key
        if (key != null) {
            req.key = key
            var dna = Key.generate(32)
            const user = await User.findOne({passkey: key}).exec()
            user.basekey = dna
            await user.save()
            res.locals.dna = dna
            res.clearCookie('key')
        }
    }
    if (req.body.usr){
        console.log('yay');
    }
    next()
}