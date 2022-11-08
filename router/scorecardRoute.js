const express = require('express')
const router = express.Router()
const {
    createScoreCard,
    getScorecard,
    generateQualityScore
} = require('../controllers/scoreCardController')

router.route('/create-scorecard').post(createScoreCard)
router.route('/get-scorecard').get(getScorecard)
router.route('/generate-quality-score').get(generateQualityScore)
module.exports = router


