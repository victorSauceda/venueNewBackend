// const mongoose = require("mongoose");
// const UserSchema = new mongoose.Schema(
//   {
//     // restId: Schema.Types.ObjectId,
//     // custId: Schema.Types.ObjectId,
//     // orderId: Schema.Types.ObjectId,
//     // createdAt: { type: Date, default: Date.now },
//     // restName: String,

//     // custName: String,
//     // distance: Number,
//     // dietType: String,
//     // salesTax: Number,
//     // total: Number,
//     // cartItems: Array
//     name: String,
//     amount: Number
//   },
//   { timestamps: true }
// );

// export default mongoose.model("User", UserSchema);

import { Schema, model } from "mongoose";
const UserSchema = new Schema({
  id: String,
  firstName: String,
  lastName: String,
  createdAt: Date
});
export default model("User", UserSchema);
