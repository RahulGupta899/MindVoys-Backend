const mongoose = require('mongoose')
const {formattedDateNow} = require('../helper/helper')

const campaignSchema = new mongoose.Schema({
    campaignName: String,
    createdAtDateTime: {
        type: String,
        default : formattedDateNow()
    }
})

module.exports = mongoose.model('campaign',campaignSchema)