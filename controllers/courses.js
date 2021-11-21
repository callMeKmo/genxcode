// get all requst:

exports.all = (req,res)=>{
    res.render('courses/all')
}

// get preview requst:

exports.preview = (req,res)=>{
    res.render('courses/preview',{dir:'courses',course:req.params.course})
}

// get video requst:

exports.part = (req,res)=>{
    res.render('courses/part',{dir:'courses',course:req.params.course,part:req.params.part})
}

// get modify requst:

exports.modify = (req,res)=>{
    res.render('courses/modify')
}