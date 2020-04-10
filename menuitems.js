"use strict";
const MenuItems = require("./models/MenuItems").default;
const mongoose = require("mongoose");

module.exports.create = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  console.log(event.body);
  try {
    await mongoose.connect(process.env.DB);
    const menuItems = await MenuItems.create(JSON.parse(event.body));
    console.log(menuItems);
    await mongoose.connection.close();
    return callback(null, {
      statusCode: 200,
      body: JSON.stringify(menuItems),
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
    const menuItems = await MenuItems.find({ id: event.pathParameters.id });
    await mongoose.connection.close();
    console.log("Transaction object: ", menuItems);
    callback(null, {
      statusCode: 200,
      body: JSON.stringify(menuItems),
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
    const transactions = await MenuItems.find();
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
    const menuItems = await MenuItems.findOneAndUpdate(
      { id: event.pathParameters.id },
      JSON.parse(event.body),
      { new: true }
    );
    await mongoose.connection.close();
    return callback(null, {
      statusCode: 200,
      body: JSON.stringify(menuItems),
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
    const menuItems = await MenuItems.findOneAndRemove({
      _id: event.pathParameters.id
    });
    await mongoose.connection.close();
    return callback(null, {
      statusCode: 200,
      body: JSON.stringify({
        message: "Removed Transaction with id: " + menuItems._id,
        menuItems: menuItems
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
