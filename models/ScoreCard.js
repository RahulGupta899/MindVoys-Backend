const mongoose = require('mongoose')
const {formattedDateNow} = require('../helper/helper')

const scoreCardSchema = new mongoose.Schema({
    scoreCardName:  String,
    questions: [{
        question: String,
        tag: String,
        score: Number,
    }],
    campaignId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    createdDateTime: {
        type: String,
        default: formattedDateNow()
    }
})

module.exports =  mongoose.model('scorecard',scoreCardSchema)
