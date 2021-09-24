const express = require('express');
const mongoose = require('mongoose')
const dotenv = require('dotenv');
const app = express();
const pinRoute = require('./routes/pins')

dotenv.config()

app.use(express.json)

mongoose.connect(process.env.MONGO_URL, 
    { useNewUrlParser: true, unUnifiedTopology: true }, 
    () => {
    console.log("Connected to MongoDB")
})

app.use("/api/pins", pinRoute);

app.listen(5000, () => {
    console.log('listening on port 5000...');
})