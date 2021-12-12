// modules: 

const User = require('../models/user')
const Log = require('../models/log')
const Key = require('../models/key')
const nodemailer = require('nodemailer')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
var crypto = require('crypto')
const gen = require('../keygen')

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
        default: res.cookie('note',`${req.params.action} is not found`),res.redirect('/')
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
    // check empty and syntax
    if (req.body.email == null || req.body.email == '') return res.cookie('note','email is empty'),res.redirect('/o/login')
    if (req.body.password == null || req.body.passsword == '') return res.cookie('note','password is empty'),res.redirect('/o/login')
    const user = await User.find({email: req.body.email}).exec()
    if (typeof user === 'object' || typeof user === Array){
    if (user.length != 1) return res.cookie('note','user not found'),res.redirect('/o/login')
    } else if (user[0] == null) return res.cookie('note','user not found'),res.redirect('/o/login')
    if ( req.body.email.indexOf('@gmail') < 0 || req.body.email.split('@gmail')[1].indexOf('.') < 0) return res.cookie('note','email syntax is incorrect'),res.redirect('/o/login')
    if (req.body.password.length <= 7) return res.cookie('note','password is too short'),res.redirect('/o/login')
    try {
        //compare hased password
        bcrypt.compare(req.body.password, user[0].password, async(err, result)=>{
            if (err) return res.cookie('note','email and password dont match'),res.redirect('/o/login')
            if (result) {
                if (user[0].verfied){
                    //create SR_UT
                    var crokey = gen.generate(32)
                    var ivokey = gen.generate(16)
                    var daokey = gen.generate(16)
                    user[0].passkey = gen.generate(64)
                    await user[0].save()
                    const redata = Buffer.from(`${process.env.STRING_CMD}+${user[0].username}`, 'utf8').toString('hex')
                    const recipher = crypto.createCipheriv(process.env.ALGORITHM, crokey, ivokey)
                    var encryptedData = recipher.update(redata,"utf-8","hex")
                    const reKey = new Key({
                        crkey: crokey,
                        ivkey: ivokey,
                        dakey: daokey
                    })
                    await reKey.save()
                    const retoken = genreateAccessToken({o: `${encryptedData}${recipher.final("hex")}`,k: user[0].passkey,d: daokey},'REFRESH_TOKEN_SECRET',24*60)
                    res.cookie('SR_UT',`${retoken}`,{maxAge: 24*60*60*1000,secured: process.env.NODE_ENV !== "development"})
                    res.redirect('/')
                }else {
                    return res.cookie('note','not verified'),res.redirect('/o/login')
                }
            } else return res.cookie('note','unexpected error while logging in'),res.redirect('/o/login')
            if (user[0].type === 'admin'){
                const log = new Log({
                    card:'admin login',
                    action:`${user[0].email} have logged in at ${Date.now()}`
                })
                await log.save()
            }
        })
    } catch (err) {
        res.cookie('note','unexpected error while logging in')
        res.redirect('/')
    }
}

// signup request:

exports.signup = async(req,res)=>{
    // check empty and syntax
    if ( req.body.email == null || req.body.email === '') return res.cookie('note','email is empty'),res.redirect('/o/signup')
    if ( req.body.username == null || req.body.username === '') return res.cookie('note','username is empty'),res.redirect('/o/signup')
    if ( req.body.password == null || req.body.password === '') return res.cookie('note','password is empty'),res.redirect('/o/signup')
    if ( req.body.age == null || req.body.age === '') return res.cookie('note','age is empty'),res.redirect('/o/signup')
    if ( req.body.confirmPassword == null || req.body.confirmPassword === '') return res.cookie('note','password confirm is empty'),res.redirect('/o/signup')
    if ( req.body.email.indexOf('@gmail') < 0 || req.body.email.split('@gmail')[1].indexOf('.') < 0) return res.cookie('note','email syntax is incorrect'),res.redirect('/o/signup')
    if ( req.body.password.length < 7) return res.cookie('note','password is too short'),res.redirect('/o/signup')
    if ( req.body.password !== req.body.confirmPassword) return res.cookie('note','wrong confirm password'),res.redirect('/o/signup')
    try {
        const checkUsers = await User.find({email : req.body.email})
        if (checkUsers.length > 0) return res.cookie('note','email already exist'),res.redirect('/o/signup')
        //hash password
        var encryptedPassword = await bcrypt.hash(req.body.password, 10)
        res.redirect('./login')
        //save user and report
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
        var key = gen.generate(56)
        newUser.basekey = key
        await newUser.save()
        // send gmail with verification method
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
        res.cookie('note','unexpected error while signup')
        res.redirect('/o/signup')
    }
}

// logout request:

exports.logout = async (req,res)=>{
    try {
        const user = req.userInfo
        if (user.length != 0){
            //remove authorzation data
            user.passkey = null
            user.basekey = null
            res.clearCookie('SR_UT')
            await user.save()
            res.redirect('/')
            if (user.type === 'admin'){
                //create a report
                const log = new Log({
                    card:`admin logout`,
                    action:`Admin ${user[0].email} have logged out`
                })
                await log.save()
            }
        } else {
            res.cookie('note','user not found')
        }
    } catch (err){
        console.log(err);
        res.cookie('note','unexpected error while logout')
        res.redirect('/')
    }
}

//key verify request:

exports.verify = async (req,res)=>{
    try {
        const user = await User.findOne({basekey: req.params.key}).exec()
        user.verfied = true
        await user.save()
        res.redirect('/o/login')
    } catch (err) {
        console.log(err)
        res.cookie('note','unexpected error while verifing')
        res.redirect('/')
    }
}

// email recovery request

exports.recovery = async (req,res)=>{
    //check email
    if ( req.body.email == null || req.body.email === '') return res.cookie('note','email is empty'),res.redirect('/o/recovery')
    if ( req.body.email.indexOf('@gmail') < 0 || req.body.email.split('@gmail')[1].indexOf('.') < 0) return res.cookie('note','email syntax is wrong'),res.redirect('/o/recovery')
    const user = await User.find({email: req.body.email}).exec()
    try {
        if (user.length > 0){
            if (user[0].verfied == false) return res.cookie('note','email is not verified'),res.redirect('/o/recovery')
            var key = generate(56)
            user[0].basekey = key
            await user[0].save()
            res.redirect(`/o/login`) 
            // send email recovery message
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
                    console.log(err)
                }
            })
        } else {
            res.cookie('note','email not found')
            res.redirect('/o/recovery')
        }
    } catch (err){
        console.log(err)
        res.cookie('note','unexpected error while recovering email')
        res.redirect('/')
    }
}

// password reset request

exports.reset = async (req,res)=>{
    try {
        const user = await User.find({basekey: req.params.key}).exec()
        if ( req.body.password == null || req.body.password === '') return res.cookie('note','password is empty'),res.redirect(`/o/r/v/${req.params.key}`)
        if ( req.body.password.length < 7) return res.cookie('note','password is too short'),res.redirect(`/o/r/v/${req.params.key}`)
        if ( req.body.password !== req.body.confirmPassword) return res.cookie('note','confirm password is wrong'),res.redirect(`/o/r/v/${req.params.key}`)
        if (user[0].verfied == false) return res.cookie('note','user not verified'),res.redirect(`/o/r/v/${req.params.key}`)
        var encryptedPassword = await bcrypt.hash(req.body.password, 10)
        user[0].password = encryptedPassword
        await user[0].save()
        res.redirect('/o/login')
    } catch (err){
        console.error(err);
        res.cookie('note','unexpected error while reseting password')
        res.redirect('/')
    }
}

// create new jwt token signtuary

function genreateAccessToken(json,env,dur) {
    if (dur){
        return jwt.sign(json, process.env[`${env}`], {expiresIn: `${dur}m`})
    } else {
        return jwt.sign(json, process.env[`${env}`])
    }
}