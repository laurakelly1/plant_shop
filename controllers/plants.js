const express = require('express');
const { route } = require('express/lib/application');
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
router.delete('/:id', (req, res) => {
    Plant.findByIdAndRemove(req.params.id, () => {
        res.redirect('/shop');
    });
});

//U
router.put('/:id', (req, res) => {
    Plant.findByIdAndUpdate(req.params.id, req.body, () => {
        res.redirect('/shop');
    })
})

//C
router.post('', (req, res) => {
    Plant.create(req.body, (error, createdPlant) => {
        res.redirect('/shop');
    });
});

//E
router.get('/:id/edit', (req, res) => {
    Plant.findById(req.params.id, (error, foundPlant) => {
        res.render('plants/edit.ejs', {
            plant: foundPlant,
        });
    });
});

//S
router.get('/:id', (req, res) => {
    Plant.findById(req.params.id, (error, foundPlant) => {
        res.render('plants/show.ejs', {
            plant: foundPlant,
        });
    });
});

module.exports = router;