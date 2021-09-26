const express = require('express');
const router = express.Router();
const { getAllPins, createPin } = require('../controllers/pins')

router.route('/').get(getAllPins).post(createPin)

module.exports = router