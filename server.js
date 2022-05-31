// Dependencies
const express = require("express");
const app = express();
require("dotenv").config();
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const session = require("express-session");
const Plant = require("./models/plants.js");

// Database Configuration
// HEROKU
const MONGODB_URI = process.env.MONGODB_URI;
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

db.on("error", (err) => console.log(err.message + " is mongod not running?"));
db.on("connected", () => console.log("mongod connected: ", MONGODB_URI));
db.on("disconnected", () => console.log("mongod disconnected"));

// // LOCAL
// mongoose.connect(process.env.DATABASE_URL, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// // Database Connection Error / Success
// const db = mongoose.connection;
// db.on("error", (err) => console.log(err.message + " is mongod not running?"));
// db.on("connected", () => console.log("mongo connected"));
// db.on("disconnected", () => console.log("mongo disconnected"));

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride("_method"));
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(express.static(__dirname + "/public"));

// Routes/ Controllers
const plantsController = require("./controllers/plants.js");
app.use("/shop", plantsController);

const userController = require("./controllers/users.js");
app.use("/users", userController);

const sessionsController = require("./controllers/sessions.js");
app.use("/sessions", sessionsController);

app.get("/", (req, res) => {
  Plant.find({}, (error, foundPlants) => {
    if (req.session.currentUser) {
      res.render("dashboard.ejs", {
        currentUser: req.session.currentUser,
        plants: foundPlants,
      });
    } else {
      res.render("index.ejs", {
        currentUser: req.session.currentUser,
        plants: foundPlants,
      });
    }
  });
});

// Listening
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Listening...");
});
