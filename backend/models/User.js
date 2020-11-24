const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, max: 22 },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, min: 8, max: 26 },
  savedApartments: { type: [Object], required: false },
  type: { type: String, required: true},
});

module.exports = mongoose.model("User", userSchema);
