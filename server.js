// Dependencies
const express = require('express');
const app = express();
require('dotenv').config();



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