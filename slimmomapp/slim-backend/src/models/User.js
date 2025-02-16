const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  dailyCalories: { type: Number },
  forbiddenProducts: [{ type: String }],
});
module.exports = mongoose.model("User", userSchema);
