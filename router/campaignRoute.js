const express = require('express')
const router = express.Router()

const {createCampaign} = require('../controllers/campaignController')
router.route('/create-campaign').post(createCampaign)

module.exports = router