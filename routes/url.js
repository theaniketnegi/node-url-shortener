const express = require('express');
const {generateNewShortUrl} = require('../controllers/url.js')
const router = express.Router();

router.post('/', generateNewShortUrl)

module.exports = router