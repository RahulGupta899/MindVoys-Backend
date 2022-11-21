const express = require('express')
const router = express.Router()
const {
    createScoreCard,
    getScorecard,
    generateQualityScore,
    generateDateWiseQualityScore,
    generateDateRangeQualityScore,
    getOldestAndRecentDates
} = require('../controllers/scoreCardController')

router.route('/create-scorecard').post(createScoreCard)
router.route('/get-scorecard').get(getScorecard)
router.route('/generate-quality-score').get(generateQualityScore)
router.route('/generate-datewise-quality-score').get(generateDateWiseQualityScore)
router.route('/generate-date-range-quality-score').get(generateDateRangeQualityScore)
router.route('/get-oldest-and-newest-date').get(getOldestAndRecentDates)
module.exports = router


