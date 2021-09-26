const mongoose = require('mongoose')

const PinSchema = new mongoose.Schema({
    pinname: {
        type: String,
        require: true,
    },
    title: {
        type: String,
        require: true,
        min: 3,
    },
    desc: {
        type: String,
        require: true,
        min: 3,
    },
    rating: {
        type: Number,
        require: true,
        min: 0,
        max: 5,
    },
    latitude: {
        type: Number,
        require: true,
    },
    longitude: {
        type: Number,
        require: true,
    },
},{
    timestamps: true
})

module.exports = mongoose.model("Pin", PinSchema)
