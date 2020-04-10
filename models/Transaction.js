const mongoose = require("mongoose");
const TransactionSchema = new mongoose.Schema({
  restaurantId: String,
  orderId: String,
  createdAt: Number,
  restaurantName: String,
  customerName: String,
  salesTax: String,
  total: Number,
  cartItems: Array
});

//Add customer phone number
//discount
//total qty

export default mongoose.model("Transaction", TransactionSchema);
