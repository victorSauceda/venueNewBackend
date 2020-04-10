"use strict";
const User = require("./models/User").default;
const mongoose = require("mongoose");

module.exports.create = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    await mongoose.connect(process.env.DB);
    const user = await User.create(JSON.parse(event.body));
    await mongoose.connection.close();
    return callback(null, {
      statusCode: 200,
      body: JSON.stringify(user),
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

module.exports.getOne = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  console.log("User Event: ", event);
  console.log("User Context: ", context);
  console.log("User Callback: ", callback);
  try {
    await mongoose.connect(process.env.DB);
    const user = await User.find({ id: event.pathParameters.id });
    await mongoose.connection.close();
    console.log("User object: ", user);
    callback(null, {
      statusCode: 200,
      body: JSON.stringify(user),
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true
      }
    });
  } catch (err) {
    console.log("User error: ", err);
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
    const users = await User.find();
    await mongoose.connection.close();
    callback(null, {
      statusCode: 200,
      body: JSON.stringify(users),
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
    const user = await User.findOneAndUpdate(
      { id: event.pathParameters.id },
      JSON.parse(event.body),
      { new: true }
    );
    await mongoose.connection.close();
    return callback(null, {
      statusCode: 200,
      body: JSON.stringify(user),
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
    const user = await User.findOneAndRemove({ id: event.pathParameters.id });
    await mongoose.connection.close();
    return callback(null, {
      statusCode: 200,
      body: JSON.stringify({
        message: "Removed user with id: " + user._id,
        user: user
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
