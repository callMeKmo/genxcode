// get home requst:

exports.profile = (req,res)=>{
    res.render('user/profile')
}

// get mailbox requst:

exports.mailbox = (req,res)=>{
    res.render('user/mailbox')
}

// get settings requst:

exports.settings = (req,res)=>{
    res.render('user/settings')
}

// get subscriptions requst:

exports.subscriptions = (req,res)=>{
    res.render('user/subscription')
}