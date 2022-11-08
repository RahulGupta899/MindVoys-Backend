const ScoreCard = require('../models/ScoreCard')
const Transcription = require('../models/transcription')

exports.createScoreCard = async(req,res)=>{
    try{
        const newData = {...req.body}
        console.log(newData)
        const scoreCard = await ScoreCard.create(newData)
        res.status(200).json({
            success: true,
            scoreCard
        })
    }
    catch(err){
        res.status(500).json({
            success: false,
            error: err.message
        })
    }
}

exports.getScorecard = async(req,res)=>{
    try{
        const scorecard = await ScoreCard.findOne()
        res.status(200).json({
            success: true,
            scorecard
        })
    }
    catch(err){
        res.status(200).json({
            success: false,
            message: err.message
        })
    }
}

exports.generateQualityScore = async(req,res)=>{
    const scoreCardData = await ScoreCard.findOne().select("questions");
    const transcriptionData = await Transcription.find().select("tags").lean()
    console.log(transcriptionData)

    //### CURATE QUALITY PARAMETERS AND THEIR WEIGHTAGE###
    const qualityParameters = [];
    const qualityParameterWeightage = [];
    scoreCardData.questions.map((item)=>{
        qualityParameters.push(item.tag.toLocaleLowerCase())
        qualityParameterWeightage.push(item.score)
    })
    console.log(qualityParameters)
    console.log(qualityParameterWeightage)

    let totalScore = 0;
    let passScore = 0;
    transcriptionData.map((transcription)=>{
        const keys = Object.keys(transcription.tags)
        console.log(keys)
        keys.map((key)=>{
            console.log(key)
            const tagName = transcription.tags[key].tag.toLowerCase()
            const match = transcription.tags[key].match
            console.log(tagName+" "+match)
            const idx = qualityParameters.findIndex((element)=> element === tagName)
            if(idx>=0){ //Found in Quality parameters
                totalScore+= qualityParameterWeightage[idx]
                passScore+= (match)? qualityParameterWeightage[idx] : 0
            }
        })
    })
    console.log("Total Quality Score: ",totalScore)
    console.log("Quality Score: ",passScore)
    const percentage = ((passScore/totalScore)*100).toFixed(2)
    console.log("Percentage: ",percentage+"%") 


    res.status(200).json({
        success: true,
        percentage
    })


}