"use strict";

const fetch = require("node-fetch");
const AWS = require("aws-sdk"); // eslint-disable-line import/no-extraneous-dependencies

const s3 = new AWS.S3();

module.exports.save = (event, context, callback) => {
  fetch(event.image_url)
    .then(response => {
      console.log(response);
      if (response.ok) {
        return response;
      }
      return Promise.reject(
        new Error(
          `Failed to fetch ${response.url}: ${response.status} ${response.statusText}`
        )
      );
    })
    .then(response => {
      console.log(response);
      return response.buffer();
    })
    .then(buffer =>
      s3
        .putObject({
          Bucket: "venueappimages",
          Key: event.key,
          Body: buffer
        })
        .promise()
    )
    .then(v => callback(null, v), callback);
};
