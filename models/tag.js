const mongoose = require('mongoose')
const {formattedDateNow} = require('../helper/helper')

const tagSchema = new mongoose.Schema({
    tagName:    String,
    keywords:   [String],
    regex:      String,
    range:      Number,          //Percentage
    campaignId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    createdAtDateTime: {
        type: String,
        default: formattedDateNow()
    }
})

module.exports =  mongoose.model('tags',tagSchema)
