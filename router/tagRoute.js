const express = require('express')
const router = express.Router()

const {createTag} = require('../controllers/tagController')

router.route('/create-tag').post(createTag)

module.exports = router