const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cartSchema = new Schema({
  name: String,
  description: String,
  type: Array,
  botanicalName: String,
  price: Number,
  quantity: Number,
  image: String,
  bestSeller: Boolean,
  amount: Number,
});

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
