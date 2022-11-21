const ScoreCard = require('../models/ScoreCard')

exports.scoreCardQualityParametersAndWeightage = async()=>{
    //### MASTER SCORECARD ###
    const scoreCardData = await ScoreCard.findOne().select("questions");
    
    //### CURATE QUALITY PARAMETERS AND THEIR WEIGHTAGE###
    const qualityParameters = [];
    const qualityParameterWeightage = [];
    scoreCardData.questions.map((item)=>{                       // TC:O(q)
        qualityParameters.push(item.tag.toLocaleLowerCase())
        qualityParameterWeightage.push(item.score)
    })
    return {
        qualityParameters,
        qualityParameterWeightage
    }
}

exports.getOverallQualityScore = async(transcriptions)=>{

    //### CURATE QUALITY PARAMETERS AND THEIR WEIGHTAGE###
    const {
        qualityParameters,
        qualityParameterWeightage
    } = await this.scoreCardQualityParametersAndWeightage()

    let totalScore = 0;
    let passScore = 0;
    transcriptions.map((transcription)=>{
        transcription.tags.map((tag)=>{
            const tagName = tag.tag.toLowerCase();
            const match = tag.match;
            const idx = qualityParameters.findIndex((element)=> element === tagName)
            if(idx>=0){      //Found in Quality parameters
                totalScore+= qualityParameterWeightage[idx]
                passScore+= (match)? qualityParameterWeightage[idx] : 0
            }
        })
    })
    const percentage = ((passScore/totalScore)*100).toFixed(2)
    return percentage
}
