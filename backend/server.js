const app = require("./app");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const connectDataBase = require("./config/database");
dotenv.config({ path: "backend/config/config.env" });
const express = require('express')
const path = require('path')

const cloudinary = require("cloudinary");

// Handling Uncaught Exception Error
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting down due to Uncaught Exception ");
  process.exit(1);
});

// database connection
mongoose.set("strictQuery", true);
connectDataBase();

cloudinary.config({
  cloude_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const PORT = process.env.PORT || 5000;

// if (process.env.NODE_ENV === "PRODUCTION") {
//   console.log("hello prod");
//   app.use(express.static(path.join(__dirname, "../frontend/build")));
//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
//   });
// }

// Server runnig
const server = app.listen(PORT, () => {
  console.log(
    `Server is starting on port:${PORT} in ${process.env.NODE_ENV} mode`
  );
});

// Handling Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting down the server due to Unhandled Promise Rejection");
  server.close(() => {
    process.exit(1);
  });
});
