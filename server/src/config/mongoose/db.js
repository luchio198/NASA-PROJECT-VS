"use strict";

const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", false);
    const conn = await mongoose.connect(
      process.env.MONGO_URI
      // {
      //   useUnifiedTopology: true,
      //   useNewUrlParser: true,
      //   // useCreateIndex: true,
      //   // useFindAndModify: false,
      // }
    );
    // mongoose.connection.once("open", () => {
    //   console.log(`MongoDB connection ready on ${conn.connection.host}`);
    // });
    // mongoose.connection.on("error", (err) => {
    //   console.error(err);
    // });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

const discoonectDB = async () => {
  await mongoose.disconnect();
};

module.exports = { connectDB, discoonectDB };
