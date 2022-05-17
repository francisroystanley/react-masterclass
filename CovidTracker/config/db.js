const mongoose = require("mongoose");
const config = require("config");

const db = config.get("mongoURI");

const connectDB = async (cb = () => {}) => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    });
    console.log("MongoDB connected...");
    cb();
  } catch (err) {
    console.log("MongoDB connection failed...");
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
