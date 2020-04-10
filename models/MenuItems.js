const mongoose = require("mongoose");
const MenuItemsSchema = new mongoose.Schema({
  name: String,
  img: String,
  price: Number,
  calories: Number,
  description: String,
  alt: String,
  dietType: String
});

export default mongoose.model("MenuItems", MenuItemsSchema);
