const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const plantSchema = new Schema({
  name: String,
  description: String,
  type: Array,
  botanicalName: String,
  price: Number,
  quantity: Number,
  image: String,
  bestSeller: Boolean,
});

const Plant = mongoose.model("Plant", plantSchema);

module.exports = Plant;
