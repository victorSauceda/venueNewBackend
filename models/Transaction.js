const mongoose = require("mongoose");
const TransactionSchema = new mongoose.Schema(
  {
    // restId: Schema.Types.ObjectId,
    // custId: Schema.Types.ObjectId,
    // orderId: Schema.Types.ObjectId,
    // createdAt: { type: Date, default: Date.now },
    // restName: String,

    // custName: String,
    // distance: Number,
    // dietType: String,
    // salesTax: Number,
    // total: Number,
    // cartItems: Array
    name: String,
    amount: Number
  },
  { timestamps: true }
);

export default mongoose.model("Transaction", TransactionSchema);
