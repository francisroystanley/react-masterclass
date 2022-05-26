const mongoose = require("mongoose");
const config = require("config");

const db = config.get("mongoURI");

const connection = mongoose.connection;
const connect = mongoose.connect(db);

mongoose.set("toJSON", { versionKey: false });
mongoose.set("returnOriginal", false);

connection.on("open", () => console.log("MongoDB connected..."));

connection.on("error", err => {
  console.log("MongoDB connection failed...");
  console.error(err.message);
  process.exit(1);
});

module.exports = connect;
