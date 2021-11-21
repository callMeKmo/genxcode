// get all requst:

exports.all = (req,res)=>{
    res.render('news/all')
}

// get previw requst:

exports.preview = (req,res)=>{
    res.render('news/preview')
}

// get modify requst:

exports.modify = (req,res)=>{
    res.render('news/modify')
}