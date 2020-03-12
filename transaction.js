"use strict";
const Transaction = require("./models/Transaction");
const connectToDatabase = require("./db");


module.exports.create = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  return connectToDatabase()
    .then(() => Transaction.create(JSON.parse(event.body)))
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
    .then(() => Transaction.find({ id: event.pathParameters.id }))
    .then(transaction => {
      console.log("User object: ", transaction);
      callback(null, {
        statusCode: 200,
        body: JSON.stringify(transaction),
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
    .then(() => Transaction.find())
    .then(transactions =>
      callback(null, {
        statusCode: 200,
        body: JSON.stringify(transactions),
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
      Transaction.findOneAndUpdate(
        { id: event.pathParameters.id },
        JSON.parse(event.body),
        { new: true }
      )
    )
    .then(transaction =>
      callback(null, {
        statusCode: 200,
        body: JSON.stringify(transaction),
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
    .then(() => Transaction.findOneAndRemove({ id: event.pathParameters.id }))
    .then(transaction =>
      callback(null, {
        statusCode: 200,
        body: JSON.stringify({
          message: "Removed user with id: " + transaction._id,
          transaction: transaction
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
