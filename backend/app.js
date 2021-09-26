const express = require('express');
const app = express();
const port = process.env.PORT || 5000
const connectDB = require('./db/connect')
const pins = require('./routes/pins')
require('dotenv').config()
app.use(express.json())

app.use('/pins', pins)

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL)
        app.listen(port, () => {
            console.log(`Connected to DB and listening on port ${port}...`)
        })
    } catch (err) {
        console.error(err)
    }
}

start()