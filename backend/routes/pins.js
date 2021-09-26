const express = require('express');
const router = express.Router();
const { getAllPins } = require('../controllers/pins')

router.route('/').get(getAllPins)

module.exports = router