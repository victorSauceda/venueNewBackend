"use strict";
const User = require("./models/User");
const connectToDatabase = require("./db");

module.exports.create = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  return connectToDatabase()
    .then(() => User.create(JSON.parse(event.body)))
    .then(user =>
      callback(null, {
        statusCode: 200,
        body: JSON.stringify(user),
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true
        }
      })
    )
    .catch(err =>
      callback(null, {
        statusCode: err.statusCode || 500,
        body: JSON.stringify(err),
        headers: {
          "Content-Type": "text/plain",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true
        }
      })
    );
};

module.exports.getOne = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  console.log("User Event: ", event);
  console.log("User Context: ", context);
  console.log("User Callback: ", callback);
  return connectToDatabase()
    .then(() => User.find({ id: event.pathParameters.id }))
    .then(user => {
      console.log("User object: ", user);
      callback(null, {
        statusCode: 200,
        body: JSON.stringify(user),
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true
        }
      });
    })
    .catch(err => {
      console.log("User error: ", err);
      callback(null, {
        statusCode: err.statusCode || 500,
        body: JSON.stringify(err),
        headers: {
          "Content-Type": "text/plain",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true
        }
      });
    });
};

module.exports.getAll = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  return connectToDatabase()
    .then(() => User.find())
    .then(users =>
      callback(null, {
        statusCode: 200,
        body: JSON.stringify(users),
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true
        }
      })
    )
    .catch(err =>
      callback(null, {
        statusCode: err.statusCode || 500,
        body: JSON.stringify(err),
        headers: {
          "Content-Type": "text/plain",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true
        }
      })
    );
};

module.exports.update = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  return connectToDatabase()
    .then(() =>
      User.findOneAndUpdate(
        { id: event.pathParameters.id },
        JSON.parse(event.body),
        { new: true }
      )
    )
    .then(user =>
      callback(null, {
        statusCode: 200,
        body: JSON.stringify(user),
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true
        }
      })
    )
    .catch(err =>
      callback(null, {
        statusCode: err.statusCode || 500,
        body: JSON.stringify(err),
        headers: {
          "Content-Type": "text/plain",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true
        }
      })
    );
};

module.exports.delete = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  return connectToDatabase()
    .then(() => User.findOneAndRemove({ id: event.pathParameters.id }))
    .then(user =>
      callback(null, {
        statusCode: 200,
        body: JSON.stringify({
          message: "Removed user with id: " + user._id,
          user: user
        }),
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true
        }
      })
    )
    .catch(err =>
      callback(null, {
        statusCode: err.statusCode || 500,
        body: JSON.stringify(err),
        headers: {
          "Content-Type": "text/plain",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true
        }
      })
    );
};
