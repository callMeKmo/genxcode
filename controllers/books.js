// get all requst:

exports.all = (req,res)=>{
    res.render('books/all')
}

// get preview requst:

exports.preview = (req,res)=>{
    res.render('books/preview',{dir:'books',book:req.params.book})
}

// get preview requst:


exports.chapter = (req,res)=>{
    res.render('books/chapter',{dir:'books',book:req.params.book,chapter:req.params.chapter})
}

// get modify requst:

exports.modify = (req,res)=>{
    res.render('books/modify')
}

// create new book requst:

exports.create = (req,res)=>{
    // code here
}

// update exist book requst:

exports.update = (req,res)=>{
    // code here
}

// delete exist book requst:

exports.delete = (req,res)=>{
    // code here
}