const Campaign = require('../models/campaign')
exports.createCampaign = async(req,res)=>{
    try{
        const newData = {...req.body}
        const campaign = await Campaign.create(newData)
        res.status(200).json({
            success: true,
            campaign
        })
    }
    catch(err){
        res.status(200).json({
            success: failed,
            err: err.message
        })
    }
}