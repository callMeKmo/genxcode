// get all requst:

exports.all = (req,res)=>{
    res.render('books/all')
}

// get preview requst:

exports.preview = (req,res)=>{
    res.render('books/preview',{dir:'books',book:req.params.book})
}

exports.chapter = (req,res)=>{
    res.render('books/chapter',{dir:'books',book:req.params.book,chapter:req.params.chapter})
}

// get modify requst:

exports.modify = (req,res)=>{
    res.render('books/modify')
}