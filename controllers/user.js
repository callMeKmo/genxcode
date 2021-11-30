// get profile requst:

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

// get library requst:

exports.library = (req,res)=>{
    res.render('user/library')
}