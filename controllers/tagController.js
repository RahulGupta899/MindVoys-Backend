const Tag = require('../models/tag')
exports.createTag = async(req,res)=>{
    try{
        const newData = {...req.body}
        console.log(newData)
        const tag = await Tag.create(newData)
        res.status(200).json({
            success: true,
            tag
        })
    }
    catch(err){
        res.status(500).json({
            success: false,
            error: err.message
        })
    }
}