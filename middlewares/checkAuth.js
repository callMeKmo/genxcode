// models

const User = require('../models/user')
const Key = require('../models/key')
const jwt = require('jsonwebtoken')
var crypto = require('crypto')

//checking if user isAdmin

exports.admin = async(req,res,next)=>{
    if (req.userInfo){
        const user = userInfo
        if (user.type === "admin" || user.type === "owner"){
            next()
        }else {
            res.cookie('note','user not admin')
        }
    } else {
        res.cookie('note','user not found'),res.redirect('/')
    }
}

// check that there is no token

exports.noAuth = (req,res,next) => {
    if (req.key == undefined || req.key == null){
        next()
    }else {
        res.cookie('note','you already logged in'),res.redirect('/')
    }
}

// check that there is token

exports.auth = async (req,res,next)=>{
    if (req.key){
        jwt.verify(req.key,process.env.ACCESS_TOKEN_SECRET,async(err,data)=>{
            if (err) {
                res.redirect(`/${req.originalUrl}`)
            } else {
                const key = await Key.findOne({dakey: data.d}).exec()
                const decipher = crypto.createDecipheriv(process.env.ALGORITHM, key.crkey, key.ivkey)
                    let decryptedData = decipher.update(data.o, "hex", "utf-8")
                    decryptedData += decipher.final("utf8")
                    var obj = Buffer.from(decryptedData, 'hex').toString('utf-8').split(`${process.env.STRING_CMD}+`)[1]
                    const user = await User.findOne({email:obj,basekey:data.k}).exec()
                    if (user){
                        req.userInfo = user
                        next()
                    } else {
                        return res.cookie('note','user not found'),res.redirect('/')
                    }
            }
        })
    }else {
        return res.cookie('note','you have to login'),res.redirect('/')
    }
}