// get adminpanel requst:

exports.adminpanel = (req,res)=>{
    res.render('admin/adminpanel')
}

exports.preview = (req,res)=>{
    res.render('admin/preview')
}

exports.orders = (req,res)=>{
    res.render('admin/orders')
}

exports.reports = (req,res)=>{
    res.render('admin/reports')
}

exports.log = (req,res)=>{
    res.render('admin/log')
}

exports.analysis = (req,res)=>{
    res.render('admin/analysis')
}

exports.users = (req,res)=>{
    res.render('admin/users')
}