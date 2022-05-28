// Dependencies
const express = require('express');
const bcrypt = require('bcrypt');
const sessionsRouter = express.Router();
const User = require('../models/user.js');

//I
//N
//D
sessionsRouter.delete('/', (req, res) => {
    req.session.destroy((error) => {
        res.redirect('/');
    })
})


//U
//C
sessionsRouter.post('/', (req, res) => {
    User.findOne({
        email: req.body.email,
    }, (error, foundUser) => {
        if (!foundUser) {
            res.send(`Oops! No user with that email address has been registered.`);
        } else {
            const passwordMatches = bcrypt.compareSync(req.body.password, foundUser.password);
            if (passwordMatches) {
                req.session.currentUser = foundUser;
                res.redirect('/');
            } else {
                res.send(`Oops! Invalid password.`);
            }
        }
    })
})

//E
//S

module.exports = sessionsRouter;