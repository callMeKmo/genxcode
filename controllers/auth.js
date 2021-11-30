// modules: 

const User = require('../models/user')
const Log = require('../models/log')

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
        case "t":
            res.render('auth/oAction')
        break
        default: res.sendStatus(404)
    }
}

// login request:

exports.login = (req,res)=>{
    //code here
}

// signup request:

exports.signup = (req,res)=>{
    //code here
}

// logout request:

exports.logout = async (req,res)=>{
    try {
        const user = await User.findOne({passkey: req.passkey}).exec()
        if (user.length != 0){
            user[0].passKey = null;
            user[0].save()
        }
        req.selectedUser = user[0]
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
