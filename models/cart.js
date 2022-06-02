const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cartSchema = new Schema({
  name: String,
  price: Number,
  quantity: Number,
  image: String,
  amount: Number,
  id: String,
});

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
