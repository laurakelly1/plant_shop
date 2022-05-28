const express = require('express');
const Plant = require('../models/plants.js');
const router = express.Router();

//I
router.get('', (req, res) => {
    Plant.find({}, (error, foundPlants) => {
        res.render('plants/index.ejs', {
            plants: foundPlants,
        });
    });
});

//N
router.get('/new', (req, res) => {
    res.render('plants/new.ejs');
});

//D
//U
//C
router.post('', (req, res) => {
    Plant.create(req.body, (error, createdPlant) => {
        res.redirect('/shop');
    });
});

//E
//S

module.exports = router;