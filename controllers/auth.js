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

exports.logout = (req,res)=>{
    //code here
}
