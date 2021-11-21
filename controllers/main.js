// get home requst:

exports.home = (req,res)=>{
    res.render('home')
}

// get lab requst:

exports.lab = (req,res)=>{
    res.render('lab')
}

// get settings requst:

exports.settings = (req,res)=>{
    res.render('settings')
}

// get subscribe requst:

exports.result = (req,res)=>{
    res.render('results',{query:req.query.for})
}