// models

const User = require('../models/user')
const jwt = require('jsonwebtoken')
const Key = require('../models/key')
var crypto = require('crypto')
var gen = require('../keygen')

// get notifications

exports.notification = (req,res,next) => {
    if (req.cookies.note) {
        const note = req.cookies.note
        if (note != null) {
            res.locals.note = note
            //res.clearCookie('note')
        } else {
            return res.cookie('note','note is empty'),res.redirect('/')
        }
    }
    next()
}

// verify SR_UT and create new S_UT for authorzation

exports.tok = async(req,res,next)=>{
    if (req.cookies.SR_UT) {
        const key = req.cookies.SR_UT
        if (key != null){
            //verify SR_UT
            jwt.verify(key,process.env.REFRESH_TOKEN_SECRET,async(err,data)=>{
                if (err){
                    return res.cookie('note','key not verified'),res.redirect('/')
                } else {
                    const key = await Key.findOne({dakey: data.d}).exec()
                    const decipher = crypto.createDecipheriv(process.env.ALGORITHM, key.crkey, key.ivkey)
                    let decryptedData = decipher.update(data.o, "hex", "utf-8")
                    decryptedData += decipher.final("utf8")
                    var obj = Buffer.from(decryptedData, 'hex').toString('utf-8').split(`${process.env.STRING_CMD}+`)[1]
                    const user = await User.findOne({username:obj,passkey:data.k}).exec()
                    if (user){
                        //create new SR_UT
                        res.locals.username = user.username
                        await key.remove()
                        res.clearCookie('SR_UT')
                        var crkey = gen.generate(32)
                        var ivkey = gen.generate(16)
                        var dakey = gen.generate(16)
                        user.passkey = gen.generate(64)
                        await user.save()
                        const data = Buffer.from(`${process.env.STRING_CMD}+${user.username}`, 'utf8').toString('hex')
                        const cipher = crypto.createCipheriv(process.env.ALGORITHM, crkey, ivkey)
                        var encryptedData = cipher.update(data,"utf-8","hex")
                        encryptedData += cipher.final("hex")
                        const newKey = new Key({
                            crkey: crkey,
                            ivkey: ivkey,
                            dakey: dakey
                        })
                        await newKey.save()
                        const token = genreateAccessToken({o: `${encryptedData}`,k: user.passkey,d: dakey},'REFRESH_TOKEN_SECRET',24*60)
                        res.cookie('SR_UT',`${token}`,{maxAge: 24*60*60*1000,secured: process.env.NODE_ENV !== "development"})
                        //create new S_UT
                        var crokey = gen.generate(32)
                        var ivokey = gen.generate(16)
                        var daokey = gen.generate(16)
                        user.basekey = gen.generate(64)
                        await user.save()
                        const datao = Buffer.from(`${process.env.STRING_CMD}+${user.email}`, 'utf8').toString('hex')
                        const ciphero = crypto.createCipheriv(process.env.ALGORITHM, crokey, ivokey)
                        var encryptedData = ciphero.update(datao,"utf-8","hex")
                        encryptedData += ciphero.final("hex")
                        const newoKey = new Key({
                            crkey: crokey,
                            ivkey: ivokey,
                            dakey: daokey
                        })
                        await newoKey.save()
                        const tokeno = genreateAccessToken({o: `${encryptedData}`,k: user.basekey,d: daokey},'ACCESS_TOKEN_SECRET',1)
                        req.key = tokeno
                        next()
                    } else {
                        return res.cookie('note','user not found'),res.redirect('/')
                    }
                }
            })
        } else {
            return res.cookie('note','SR_UT is empty'),res.redirect('/')
        }
    } else {
        next()
    }
}

function genreateAccessToken(json,env,dur) {
    if (dur){
        return jwt.sign(json, process.env[`${env}`], {expiresIn: `${dur}m`})
    } else {
        return jwt.sign(json, process.env[`${env}`])
    }
}