const Transcription = require('../models/transcription')

exports.createNewTranscription = async(req,res)=>{
    try{
        const newData = {...req.body}
        console.log(newData)
        const transcription = await Transcription.create(newData)
        res.status(200).json({
            success: true,
            transcription
        })
    }
    catch(err){
        res.status(500).json({
            success: false,
            error: err.message
        })
    }
}

exports.getAllTranscriptions = async(req,res)=>{
    try{
        const transcriptions = await Transcription.find().select("metaData callDetails tags").lean()
        res.status(200).json({
            success: true,
            transcriptions
        })
    }
    catch(err){
        res.status(400).json({
            success: false,
            message: err.message
        })
    }
}
