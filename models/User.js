const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  restId: String,
  custId: String,
  id: String,
  timeStamp: String,
  createdAt: Date,
  restName: String,
  address: String,
  custName: String,
  distance: Number,
  dietType: String,
  salesTax: Number,
  total: Number,
  cartItems: Array
});
module.exports = mongoose.model("User", UserSchema);
