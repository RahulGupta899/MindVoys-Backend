const express = require('express')
const router = express.Router()
const {
    createNewTranscription,
    getAllTranscriptions
} = require('../controllers/transcriptionController')

router.route('/create-transcription').post(createNewTranscription)
router.route('/get-all-transcriptions').get(getAllTranscriptions)
module.exports = router