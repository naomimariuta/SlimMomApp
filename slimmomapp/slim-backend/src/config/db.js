const mongoose = require("mongoose");
const connectDB = async () => {
  const DB_HOST = process.env.DB_HOST;
  mongoose
    .connect(DB_HOST)
    .then(() => {
      console.log("Database connection succesfull ^_^");
    })
    .catch((error) => {
      console.error("Database connection error:", error.message);
    });
};
module.exports = connectDB;
