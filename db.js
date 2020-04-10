const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
let isConnected;
mongoose.set("useNewUrlParser", true);
mongoose.set("useUnifiedTopology", true);

module.exports = connectToDatabase = () => {
  if (isConnected) {
    console.log("=> using existing database connection");
    return Promise.resolve();
  }

  console.log("=> using new database connection", process.env.DB);
  return mongoose
    .connect(process.env.DB, { useNewUrlParser: true })
    .then(db => {
      isConnected = db.connections[0].readyState;
    });
};
