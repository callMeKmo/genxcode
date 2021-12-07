// models

const User = require('../models/user')
const Key = require('../keygen')

//checking if user isAdmin

exports.admin = async(req,res,next)=>{
    if (req.key){
        const key = req.key
        if ( key == null) return res.cookie('error','err-0000'),res.redirect('/')
        try {
            const userData = await User.find({passkey: key}).exec()
            if ( userData[0].type !== "admin" || userData[0].type !== "owner") return res.cookie('error','err-0010'),res.redirect('/')
            next()   
        } catch{
            res.cookie('error','err-0020'),res.redirect('/')
        }
    }
}

// check that there is no auth

exports.noAuth = (req,res,next) => {
    if (req.key == undefined || req.key == null){
        next()
    }else {
        res.cookie('error','err-0100'),res.redirect('/')
    }
}

// check that there is passkey

exports.auth = async (req,res,next)=>{
    if (req.key){
        const key = req.key
        if ( key == null) return res.cookie('error','err-0200'),res.redirect('/')
        const user = await User.findOne({passkey: key}).exec()
        if (user){
            next()
        } else {
            return res.cookie('error','err-0200'),res.redirect('/')
        }
    }else {
        return res.cookie('error','err-0200'),res.redirect('/')
    }
}

exports.reAuth = async (req,res)=>{
    const user = await User.findOne({email: req.query.email,basekey: req.query.dna,username: req.query.username}).exec()
    var kee = Key.generate(56)
    user.passkey = kee
    res.cookie('key',`${kee}`)
    res.clearCookie('checkFirsto')
    console.log('launched');
    user.basekey = null
    await user.save()
    res.redirect(req.query.origin)
}