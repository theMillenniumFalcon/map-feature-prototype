const Pin = require('../models/Pin')

// get all pins
const getAllPins = (req, res) => {
    res.send('Send all pins')
}

module.exports = {
    getAllPins
}