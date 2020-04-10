"use strict";
const Transaction = require("./models/Transaction").default;
const mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);

module.exports.create = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  console.log(event.body);
  try {
    await mongoose.connect(process.env.DB);
    const transaction = await Transaction.create(JSON.parse(event.body));
    console.log(transaction);
    await mongoose.connection.close();
    return callback(null, {
      statusCode: 201,
      body: JSON.stringify(transaction),
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true
      }
    });
  } catch (err) {
    console.log(err);
    await mongoose.connection.close();
    return callback(null, {
      statusCode: err.statusCode || 500,
      body: JSON.stringify(err),
      headers: {
        "Content-Type": "text/plain",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true
      }
    });
  }
};

module.exports.getOne = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  console.log("Transaction Event: ", event);
  console.log("Transaction Context: ", context);
  console.log("Transaction Callback: ", callback);
  try {
    await mongoose.connect(process.env.DB);
    const transaction = await Transaction.findById(event.pathParameters.id);
    //transaction
    await mongoose.connection.close();
    console.log("Transaction object: ", transaction);
    callback(null, {
      statusCode: 200,
      body: JSON.stringify(transaction),
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true
      }
    });
  } catch (err) {
    console.log("Transaction error: ", err);
    await mongoose.connection.close();
    callback(null, {
      statusCode: err.statusCode || 500,
      body: JSON.stringify(err),
      headers: {
        "Content-Type": "text/plain",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true
      }
    });
  }
};

module.exports.getAll = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    await mongoose.connect(process.env.DB);
    const transactions = await Transaction.find();
    await mongoose.connection.close();
    callback(null, {
      statusCode: 200,
      body: JSON.stringify(transactions),
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true
      }
    });
  } catch (err) {
    console.log("Error: ", err);
    await mongoose.connection.close();
    callback(null, {
      statusCode: err.statusCode || 500,
      body: JSON.stringify(err),
      headers: {
        "Content-Type": "text/plain",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true
      }
    });
  }
};

module.exports.update = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    await mongoose.connect(process.env.DB);
    const transaction = await Transaction.findOneAndUpdate(
      { _id: event.pathParameters.id },
      JSON.parse(event.body),
      { new: true }
    );
    //set to 400
    await mongoose.connection.close();
    return callback(null, {
      statusCode: 200,
      body: JSON.stringify(transaction),
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true
      }
    });
  } catch (err) {
    await mongoose.connection.close();
    return callback(null, {
      statusCode: err.statusCode || 500,
      body: JSON.stringify(err),
      headers: {
        "Content-Type": "text/plain",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true
      }
    });
  }
};

module.exports.delete = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    await mongoose.connect(process.env.DB);
    console.log("path paramters", event.pathParameters.id);
    const transaction = await Transaction.findOneAndRemove({
      _id: event.pathParameters.id
    });
    await mongoose.connection.close();
    return callback(null, {
      statusCode: 200,
      body: JSON.stringify({
        message: "Removed Transaction with id: " + transaction._id,
        transaction: transaction
      }),
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true
      }
    });
  } catch (err) {
    await mongoose.connection.close();
    return callback(null, {
      statusCode: err.statusCode || 500,
      body: JSON.stringify(err),
      headers: {
        "Content-Type": "text/plain",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true
      }
    });
  }
};
