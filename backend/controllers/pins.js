const Pin = require('../models/Pin')
const asyncWrapper = require('../middleware/async')

// get all pins
const getAllPins = asyncWrapper(async (req, res) => {
    const pins = await Pin.find({})
    res.status(200).json({pins})
})

// create a pin
const createPin = asyncWrapper(async (req, res) => {
    const pin = await Pin.create(req.body)
    res.status(201).json({pin})
})

module.exports = {
    getAllPins, createPin,
}
