// Dependencies
const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');

// Database Configuration
mongoose.connect(process.env.DATABASE_URL, {
	useUnifiedTopology: true,
});

// Database Connection Error / Success
const db = mongoose.connection;
db.on('error', (err) => console.log(err.message + ' is mongod not running?'));
db.on('connected', () => console.log('mongo connected'));
db.on('disconnected', () => console.log('mongo disconnected'));


// Routes/ Controllers
const plantsController = require('./controllers/plants.js');
app.use('/shop', plantsController);


app.get('/', (req, res) => {
    res.render('index.ejs');
})


// Listening
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log("Listening...");
});