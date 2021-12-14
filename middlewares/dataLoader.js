exports.data =  async(obj,res,date,limit)=>{
    const data = await obj.find().sort({ createdAt: 'desc' }).limit(limit).lte('createdAt',date).exec()
    const count = await obj.estimatedDocumentCount({}).exec()
    var miData = []
    data.forEach(obj=>{
        miData[miData.length] = {id:obj.id,title:obj.card}
        if (miData.length == 20){
            res.json({results:miData,total:count})
        }
    })
}