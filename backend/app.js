const express = require('express');
const app = express();
const port = process.env.PORT || 5000
const connectDB = require('./db/connect')
require('dotenv').config()

app.get('/', (req, res) => {
    res.send('Hello, world!');
})

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