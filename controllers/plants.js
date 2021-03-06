const express = require("express");
const {  route  } = require("express/lib/application");
const Plant = require("../models/plants.js");
const User = require("../models/user.js");
const plantRouter = express.Router();
const Cart = require("../models/cart");
const alert = require("alert");

//SEED
const PlantSeed = require("../models/plantSeed.js");
plantRouter.get("/seed", (req, res) => {
  Plant.deleteMany({}, (error, allPlants) => {});
  Plant.create(PlantSeed, (error, data) => {
    res.redirect("/shop");
  });
});

//I
plantRouter.get("/", (req, res) => {
  Cart.find({}, (error, allCart) => {
    Plant.find({}, (error, foundPlants) => {
      if (req.session.currentUser) {
        res.render("dashboard.ejs", {
          currentUser: req.session.currentUser,
          plants: foundPlants,
          document: document,
          cart: allCart,
        });
      } else {
        res.render("index.ejs", {
          currentUser: req.session.currentUser,
          plants: foundPlants,
          document: document,
          cart: allCart,
        });
      };
    });
  });
});

plantRouter.get("/shop", (req, res) => {
  Cart.find({}, (error, allCart) => {
    Plant.find({}, (error, foundPlants) => {
      res.render("plants/index.ejs", {
        plants: foundPlants,
        currentUser: req.session.currentUser,
        cart: allCart,
      });
    });
  });
});

//N
plantRouter.get("/shop/new", (req, res) => {
  Cart.find({}, (error, allCart) => {
    res.render("plants/new.ejs", {
      currentUser: req.session.currentUser,
      cart: allCart,
    });
  });
});

//D
plantRouter.delete("/shop/:id/delete", (req, res) => {
  Cart.findByIdAndRemove(req.params.id, () => {
    res.redirect("/");
  });
});

plantRouter.delete("/shop/:id", (req, res) => {
  Plant.findByIdAndRemove(req.params.id, () => {
    res.redirect("/shop");
  });
});

//U
plantRouter.put("/shop/:id", (req, res) => {
  if (req.body.bestSeller === "on") {
    req.body.bestSeller = true;
  } else {
    req.body.bestSeller = false;
  }

  let type = req.body.type.split(", ");
  req.body.type = type;
  Plant[req.params.id] = req.body;
  Plant.findByIdAndUpdate(
    req.params.id,
    req.body, {
      new: true,
    },
    (error, updatedPlant) => {
      res.redirect(`/shop/${req.params.id}`);
    }
  );
});

//C
plantRouter.post("/shop", (req, res) => {
  if (req.body.bestSeller === "on") {
    req.body.bestSeller = true;
  } else {
    req.body.bestSeller = false;
  }
  console.log(req.body);
  Plant.create(req.body, (error, createdPlant) => {
    res.redirect("/shop");
  });
});

plantRouter.post("/shop/:id/cart", (req, res) => {
  Cart.create(req.body, (error, cartPlant) => {
    alert(`Your item was added to the cart.`);
    res.redirect(`/shop/${req.params.id}`);
  });
});

//E
plantRouter.get("/shop/:id/edit", (req, res) => {
  Cart.find({}, (error, allCart) => {
    Plant.findById(req.params.id, (error, foundPlant) => {
      res.render("plants/edit.ejs", {
        plant: foundPlant,
        currentUser: req.session.currentUser,
        cart: allCart,
      });
    });
  });
});

//S
plantRouter.get("/shop/:id", (req, res) => {
  Cart.find({}, (error, allCart) => {
    Plant.find({}, (error, allPlants) => {
      Plant.findById(req.params.id, (error, foundPlant) => {
        if (req.session.currentUser) {
          res.render("plants/show-admin.ejs", {
            plant: foundPlant,
            currentUser: req.session.currentUser,
            plants: allPlants,
            cart: allCart,
          });
        } else {
          res.render("plants/show.ejs", {
            plant: foundPlant,
            currentUser: req.session.currentUser,
            plants: allPlants,
            cart: allCart,
          });
        };
      });
    });
  });
});

module.exports = plantRouter;