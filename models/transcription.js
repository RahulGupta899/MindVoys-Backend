const mongoose = require('mongoose')
const {formattedDateNow} = require('../helper/helper')

const transcriptionSchema = new mongoose.Schema({
    metaData: {
        conversationId:         String,
        callDirection:          String,
        callDate:               String,
        callDuration:           Number,   // In mins
        startDateTime:          String,
        endDateTime:            String,
        silienceDuration:       Number,
        agentTalkTime:      Number,
        customerTalkTime:   Number,
        channels:{
            left: String,
            right: String
        },
        fileName: String
    },
    callDetails: {
        agent:{
            agentId: String,
            name: String,
            l1SupervisorName: String,
            l2SupervisorName: String
        },
        customer:{
            phoneNumber: String
        }
    },
    transcriptionDetails: {
        phrases: {
            speaker: [String],
            text: [String],
            timeStamp : [Number]
        },
        words: {
            speaker: [String],
            text: [String],
            timeStamp: [Number]
        },
        url : String
    },
    tags: [{
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'tags'
        },
        tag: String,
        match: Boolean,
    }],
    campaign:{
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'campaigns'
        },
        name: String        
    },
    createdAtDateTime: {
        type: String,
        default : formattedDateNow()
    }
})

module.exports =  mongoose.model('transcriptions',transcriptionSchema)