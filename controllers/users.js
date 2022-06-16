// Dependencies
const bcrypt = require("bcrypt");
const express = require("express");
const userRouter = express.Router();
const User = require("../models/user.js");
const Cart = require("../models/cart");

//N
userRouter.get("/new", (req, res) => {
  Cart.find({}, (error, allCart) => {
    res.render("users/new.ejs", {
      currentUser: req.session.currentUser,
      cart: allCart,
    });
  });
});

//C
userRouter.post("", (req, res) => {
  req.body.password = bcrypt.hashSync(
    req.body.password,
    bcrypt.genSaltSync(10)
  );

  User.create(req.body, (error, createdUser) => {
    res.redirect("/");
  });
});

module.exports = userRouter;
