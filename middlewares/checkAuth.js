// models

const User = require('../models/user')

//checking if user isAdmin

exports.admin = async(req,res,next)=>{
    //check if passkey for admin
}

// check that there is no auth

exports.noAuth = (req,res,next) => {
    //check if there is no passkey
}

// check that there is token

exports.auth = (req,res,next)=>{
    //check if there is an passkey passkey
}