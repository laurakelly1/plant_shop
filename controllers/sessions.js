// Dependencies
const express = require('express');
const bcrypt = require('bcrypt');
const sessionsRouter = express.Router();
const User = require('../models/user.js');
const alert = require('alert');
const Cart = require('../models/cart');

//New (login page)
sessionsRouter.get('/new', (req, res) => {
    Cart.find({}, (error, allCart) => {
    res.render('sessions/new.ejs', {
        currentUser: req.session.currentUser,
        cart: allCart,
    });
});
})

//Delete User
sessionsRouter.delete('/', (req, res) => {
    req.session.destroy((error) => {
        res.redirect('/');
    })
})

//Create User
sessionsRouter.post('/', (req, res) => {
    User.findOne({
        email: req.body.email,
    }, (error, foundUser) => {
        if (!foundUser) {
            alert(`Oops! No user with that email address has been registered.`);
        } else {
            const passwordMatches = bcrypt.compareSync(req.body.password, foundUser.password);
            if (passwordMatches) {
                req.session.currentUser = foundUser;
                res.redirect('/');
            } else {
                alert(`Oops! Invalid password.`);
            }
        }
    })
})


module.exports = sessionsRouter;