// Dependencies
const bcrypt = require('bcrypt');
const express = require('express');
const userRouter = express.Router();
const User = require('../models/user.js');

//I
//N (registration page)
userRouter.get('/new', (req, res) => {
    res.render('users/new.ejs', {
        currentUser: req.session.currentUser,
    });
})

//D
//U
//C
userRouter.post('', (req, res) => {
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
    
    User.create(req.body, (error, createdUser) => {
        res.redirect('/');
    })
})
//E
//S

module.exports = userRouter;