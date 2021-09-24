const express = require('express');
const mongoose = require('mongoose')
const dotenv = require('dotenv');
const app = express();

dotenv.config()

mongoose.connect(process.env.MONGO_URL, 
    { useNewUrlParser: true, unUnifiedTopology: true }, 
    () => {
    console.log("Connected to MongoDB")
})

app.listen(5000, () => {
    console.log('listening on port 5000...');
})