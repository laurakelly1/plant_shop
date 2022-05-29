const express = require('express');
const { route } = require('express/lib/application');
const Plant = require('../models/plants.js');
const User = require('../models/user.js');
const plantRouter = express.Router();


//SEED
const PlantSeed = require('../models/plantSeed.js');
plantRouter.get('/seed', (req, res) =>{
    Plant.deleteMany({}, (error, allPlants) => {});
    Plant.create(PlantSeed, (error, data) => {
        res.redirect('/shop');
    } )
})

//I
plantRouter.get('', (req, res) => {
    Plant.find({}, (error, foundPlants) => {
        res.render('plants/index.ejs', {
            plants: foundPlants,
            currentUser: req.session.currentUser,
        });
    });
});

//N
plantRouter.get('/new', (req, res) => {
    res.render('plants/new.ejs', {
        currentUser: req.session.currentUser
    });
});

//D
plantRouter.delete('/:id', (req, res) => {
    Plant.findByIdAndRemove(req.params.id, () => {
        res.redirect('/shop');
    });
});

//U
plantRouter.put('/:id', (req, res) => {
    if (req.body.bestSeller === 'on') {
        req.body.bestSeller = true;
    } else {
        req.body.bestSeller = false;
    }
    Plant.findByIdAndUpdate(
        req.params.id, 
        req.body, 
        {
            new: true,
        },
        (error, updatedPlant) => {        
        res.redirect(`/shop/${req.params.id}`);
    })
})

//C
plantRouter.post('', (req, res) => {
    if (req.body.bestSeller === 'on') {
        req.body.bestSeller = true;
    } else {
        req.body.bestSeller = false;
    };

    Plant.create(req.body, (error, createdPlant) => {
        res.redirect('/shop');
    });
});

//E
plantRouter.get('/:id/edit', (req, res) => {
    Plant.findById(req.params.id, (error, foundPlant) => {
        res.render('plants/edit.ejs', {
            plant: foundPlant,
            currentUser: req.session.currentUser
        });
    });
});

//S
plantRouter.get('/:id', (req, res) => {
    Plant.findById(req.params.id, (error, foundPlant) => {
        res.render('plants/show.ejs', {
            plant: foundPlant,
            currentUser: req.session.currentUser
        });
    });
});

module.exports = plantRouter;