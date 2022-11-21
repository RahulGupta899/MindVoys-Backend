const ScoreCard = require('../models/ScoreCard')
const Transcription = require('../models/transcription')

const {scoreCardQualityParametersAndWeightage,
       getOverallQualityScore
    } = require('../helper/scoreCardHelper')
const transcription = require('../models/transcription')
const {convertDate} = require('../helper/helper')

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
    
    try{
        const transcriptionData = await Transcription.find().select("tags").lean();

        //### CURATE QUALITY PARAMETERS AND THEIR WEIGHTAGE###
        // const {
        //     qualityParameters,
        //     qualityParameterWeightage
        // } = await scoreCardQualityParametersAndWeightage();

        // let totalScore = 0;
        // let passScore = 0;
        // transcriptionData.map((transcription)=>{
        //     transcription.tags.map((tag)=>{
        //         const tagName = tag.tag.toLowerCase();
        //         const match = tag.match;
        //         const idx = qualityParameters.findIndex((element)=> element === tagName)
        //         if(idx>=0){      //Found in Quality parameters
        //             totalScore+= qualityParameterWeightage[idx]
        //             passScore+= (match)? qualityParameterWeightage[idx] : 0
        //         }
        //     })
        // })
        // const percentage = ((passScore/totalScore)*100).toFixed(2)
        const percentage = await getOverallQualityScore(transcriptionData)

        res.status(200).json({
            success: true,
            percentage
        })
    }
    catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
    
    
}

exports.generateDateWiseQualityScore = async(req,res)=>{
    try{
        
        const transcriptions = await Transcription.find().select("metaData.callDate tags").lean()
        
        //##### UNIQUE DATES ######                                      TC: O(All Trans)
        let uniqueDates = new Set();
        transcriptions.map((transcription)=>{   
            const date = transcription.metaData.callDate.split(" ")[0]
            uniqueDates.add(date)
        })
        uniqueDates = Array.from(uniqueDates) // Converting set into array


        //##### DATEWISE TRANSCRIPTIONS #####                           TC: O(uniqueDates * AllTrans)
        const datewiseTranscriptions = new Map();
        uniqueDates.map((date)=>{       // k*n
            const dateTranscriptions = transcriptions.filter((transcription)=>
                                            (transcription.metaData.callDate.includes(date))
                                       )  
            datewiseTranscriptions.set(date,dateTranscriptions)
        })
        

        //##### MASTER SCORECARD #####                                  TC: O(No Of Questions In Scorecard)
        const {
            qualityParameters,
            qualityParameterWeightage
        } = await scoreCardQualityParametersAndWeightage();        
    
    
        //##### DATEWISE QUALITYSCORE #####                             TC: O(uniqueDates * smallTranscriptions * Tags )
        const scores = [];
        const transcriptionCount = []
        uniqueDates.map((date)=>{ 
            const particularDateTranscriptions = datewiseTranscriptions.get(date) 
            
            const count = particularDateTranscriptions.length;
            transcriptionCount.push(count)

            let totalScore = 0;
            let passScore = 0;
            particularDateTranscriptions.map((transcription)=>{   
                transcription.tags.map((tag)=>{                       //* CAN BE OPTIMIZED BY ITERATING ON MASTER SCORECARD 
                    const tagName = tag.tag.toLowerCase();
                    const match = tag.match;
                    const idx = qualityParameters.findIndex((element)=> element === tagName)
                    if(idx>=0){      
                        totalScore+= qualityParameterWeightage[idx]
                        passScore+= (match)? qualityParameterWeightage[idx] : 0
                    }
                })
            })
            const percentage = ((passScore/totalScore)*100).toFixed(2)
            scores.push(percentage)
        })
    
        //##### REMOVE TIME FROM DATE #####
        uniqueDates = uniqueDates.map((date)=>date.split(" ")[0])

        const data = []
        uniqueDates.map((item, idx)=>{
            const obj = {
                key: idx,
                date: uniqueDates[idx],
                qualityScore: scores[idx],
                count: transcriptionCount[idx]
            }
            data.push(obj)
        })
        
        
        //##### SEND RESPONSE #####
        res.status(200).json({
            success: true,
            datewiseQualityScore: data
        })

    }
    catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

exports.generateDateRangeQualityScore = async(req,res)=>{
    try{
        let {start,end} = req.query

        //##### FORMATTING DATE #####    
        start = start.split("/")
        end =   end.split("/")
        
        start = start[2]+"-"+start[0]+"-"+start[1]
        end = end[2]+"-"+end[0]+"-"+end[1]

        start = new Date(start).getTime()
        end = new Date(end).getTime()
        

        // TRANSCRIPTIONS IN RANGE
        const transcriptions = await Transcription.find().select("metaData.callDate tags").lean();
        const transcriptionsInRange = transcriptions.filter((transcription)=>{
            let date = transcription.metaData.callDate.split(" ")[0];
            date = new Date(date).getTime()
            if(date>=start && date<=end) return true
        })
        const percent = await getOverallQualityScore(transcriptionsInRange)
        const noOfCalls = transcriptionsInRange.length;
        res.status(200).json({
            success: true,
            data:{
                percent,
                noOfCalls
            }
        })
    }
    catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
    

}

exports.getOldestAndRecentDates = async(req,res)=>{
    
    const transcriptions = await Transcription.find({},{"metaData.callDate":1})
    let oldestDate = new Date(transcriptions[0].metaData.callDate).getTime();
    let recentDate = oldestDate

    transcriptions.map((transcription)=>{
        let dateString = transcription.metaData.callDate
        dateString = new Date(dateString).getTime()
        if(dateString<oldestDate)  oldestDate = dateString
        if(dateString>recentDate)  recentDate = dateString
    })
    oldestDate = new Date(oldestDate).toLocaleString();
    recentDate = new Date(recentDate).toLocaleString();
    oldestDate = convertDate(oldestDate)
    recentDate = convertDate(recentDate)
    
    res.status(200).json({
        success: true,
        data:{
            oldestDate,
            recentDate
        }
    })
}





