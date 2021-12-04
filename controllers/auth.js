// modules: 

const User = require('../models/user')
const Log = require('../models/log')
const nodemailer = require('nodemailer')
const bcrypt = require('bcrypt')
const Key = require('../keygen')

// get auth action requst:

exports.action = (req,res)=>{
    switch (req.params.action) {
        case "login":
            res.render('auth/login')
        break
        case "signup":
            res.render('auth/signup')
        break
        case "logout":
            res.render('auth/oAction')
        break
        case "recovery":
            res.render('auth/recovery')
        break
        default: res.sendStatus(404)
    }
}

// get reset action requst:

exports.resetAction = async (req,res)=>{
    const user = await User.findOne({basekey: req.params.key}).exec()
    if (user != undefined && user != null){
        res.render('auth/reset',{key: req.params.key})
    }
}

// login request:

exports.login = async (req,res)=>{
    if (req.body.email == null || req.body.email == '') return res.cookie('error','err-1000'),res.redirect('/o/login')
    if (req.body.password == null || req.body.passsword == '') return res.cookie('error','err-1001'),res.redirect('/o/login')
    const user = await User.find({email: req.body.email}).exec()
    if (typeof user === 'object' || typeof user === Array){
    if (user.length != 1) return res.cookie('error','err-1010'),res.redirect('/o/login')
    } else if (user[0] == null) return res.cookie('error','err-1010'),res.redirect('/o/login')
    if ( req.body.email.indexOf('@gmail') < 0 || req.body.email.split('@gmail')[1].indexOf('.') < 0) return res.cookie('error','err-1210'),res.redirect('/o/login')
    if (req.body.password.length <= 7) return res.cookie('error','err-1012'),res.redirect('/o/login')
    try {
        bcrypt.compare(req.body.password, user[0].password, async(err, result)=>{
            if (err) return res.cookie('error','err-1013'),res.redirect('/o/login')
            if (result) {
                user[0].save()
                var key = Key.generate(32)
                res.cookie('key',`${key}`,{maxAge: 10*60*1000})
                res.redirect('/')
            } else return res.cookie('error','err-1020'),res.redirect('/o/login')
            if (user[0].isAdmin == true){
                const log = new Log({
                    card:'admin login',
                    action:`${user[0].email} have logged in at ${Date.now()}`
                })
                await log.save()
            }
        })
    } catch (err) {
        console.log(err);
        res.redirect('/')
    }
}

// signup request:

exports.signup = async(req,res)=>{
    if ( req.body.email == null || req.body.email === '') return res.cookie('error','err-1200'),res.redirect('/o/signup')
    if ( req.body.username == null || req.body.username === '') return res.cookie('error','err-1201'),res.redirect('/o/signup')
    if ( req.body.password == null || req.body.password === '') return res.cookie('error','err-1202'),res.redirect('/o/signup')
    if ( req.body.age == null || req.body.age === '') return res.cookie('error','err-1203'),res.redirect('/o/signup')
    if ( req.body.confirmPassword == null || req.body.confirmPassword === '') return res.cookie('error','err-1203'),res.redirect('/o/signup')
    if ( req.body.email.indexOf('@gmail') < 0 || req.body.email.split('@gmail')[1].indexOf('.') < 0) return res.cookie('error','err-1210'),res.redirect('/o/signup')
    if ( req.body.password.length < 7) return res.cookie('error','err-1211'),res.redirect('/o/signup')
    if ( req.body.password !== req.body.confirmPassword) return res.cookie('error','err-1212'),res.redirect('/o/signup')
    try {
        const checkUsers = await User.find({email : req.body.email})
        if (checkUsers.length > 0) return res.cookie('error','err-1213'),res.redirect('/o/signup')
        var encryptedPassword = await bcrypt.hash(req.body.password, 10)
        res.redirect('./login')
        const user = new User({
            email: req.body.email,
            username: req.body.username,
            password: encryptedPassword,
            age: req.body.age,
        })
        var newUser = await user.save()
        const log = new Log({
            card:'user signup',
            action:`${newUser.email} have signed up on our application`
        })
        await log.save()
        var key = Key.generate(56)
        newUser.basekey = key
        await newUser.save()
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth:{
                user: 'Genx.mail.service@gmail.com',
                pass: 'KqvFKhRgXxSxpnbvDPjX'
            }
        })
        var mailOptions = {
            from: 'Genx.mail.service@gmail.com',
            to: `${newUser.email}`,
            subject: 'Verify your signup action',
            text: `this is your verify method:\n ${req.protocol + '://' + req.get('host') + '/o/v/' + key}`
        }
        transporter.sendMail(mailOptions,(err,info)=>{
            if (err){
                console.log(err);
            }
        })
    } catch (err){
        console.log(err);
        res.cookie('error','err-1220')
        res.redirect('/o/signup')
    }
}

// logout request:

exports.logout = async (req,res)=>{
    try {
        const user = await User.findOne({passkey: req.passkey}).exec()
        if (user.length != 0){
            user[0].passKey = null;
            user[0].save()
        }
        if (user[0].type === 'admin'){
            const log = new Log({
                card:`admin logout`,
                action:`Admin ${user[0].email} have logged out`
            })
            await log.save()
        }
    } catch {
        req.message = 'err-1100'
        res.redirect('/')
    }
}

//key verify request:

exports.verify = async (req,res)=>{
    const user = await User.findOne({basekey: req.params.key}).exec()
    user.verfied = true
    await user.save()
    res.redirect('/o/login')
}

// email recovery request

exports.recovery = async (req,res)=>{
    if ( req.body.email == null || req.body.email === '') return res.cookie('error','err-1200'),res.redirect('./recovery')
    if ( req.body.email.indexOf('@gmail') < 0 || req.body.email.split('@gmail')[1].indexOf('.') < 0) return res.cookie('error','err-1210'),res.redirect('./recovery')
    const user = await User.find({email: req.body.email}).exec()
    try {
        if (user.length > 0){
            if (user[0].verfied == false) return res.cookie('error','err-1200'),res.redirect('/o/login')
            var key = Key.generate(64)
            user[0].basekey = key
            await user[0].save()
            res.redirect(`/o/login`) 
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth:{
                    user: 'Genx.mail.service@gmail.com',
                    pass: 'KqvFKhRgXxSxpnbvDPjX'
                }
            })
            var mailOptions = {
                from: 'Genx.mail.service@gmail.com',
                to: `${user[0].email}`,
                subject: 'Email recovery',
                text: `Click the link below to reset password:\n ${req.protocol + '://' + req.get('host') + '/o/r/v/' + key}`
            }
            transporter.sendMail(mailOptions,(err,info)=>{
                if (err){
                    console.log(err);
                }
            })
        }
    } catch (err){
        console.log(err);
    }
}

// password reset request

exports.reset = async (req,res)=>{
    try {
        const user = await User.find({basekey: req.params.key}).exec()
        if ( req.body.password == null || req.body.password === '') return res.cookie('error','err-1202'),res.redirect('./')
        if ( req.body.password.length < 7) return res.cookie('error','err-1211'),res.redirect('./')
        if ( req.body.password !== req.body.confirmPassword) return res.cookie('error','err-1212'),res.redirect('./')
        if (user[0].verfied == false) return res.cookie('error','err-1200'),res.redirect('/o/login')
        var encryptedPassword = await bcrypt.hash(req.body.password, 10)
        user[0].password = encryptedPassword
        await user[0].save()
        res.redirect('/o/login')
    } catch (err){
        console.error(err);
        res.cookie('note','err-1202')
        res.redirect('/o/login')
    }
}