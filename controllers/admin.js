// get adminpanel requst:

exports.adminpanel = (req,res)=>{
    res.render('admin/adminpanel')
}

// get orders requst:

exports.orders = (req,res)=>{
    res.render('admin/orders')
}

// get reports requst:

exports.reports = (req,res)=>{
    res.render('admin/reports')
}

// get log requst:

exports.log = (req,res)=>{
    res.render('admin/log')
}

// get analysis requst:

exports.analysis = (req,res)=>{
    res.render('admin/analysis')
}

// get users requst:

exports.users = (req,res)=>{
    res.render('admin/users')
}

// change user request:

exports.usersChange = (req,res)=>{
    // code here
}

// remove user requst:

exports.usersRemove = (req,res)=>{
    // code here
}