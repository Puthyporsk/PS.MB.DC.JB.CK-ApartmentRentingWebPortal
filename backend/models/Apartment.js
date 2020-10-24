const mongoose = require("mongoose");

const apartmentSchema = new mongoose.Schema({
  mainImage: { type: String, required: true },
  price: { type: Number, required: true },
  city: { type: String, required: true },
  sqft: { type: Number, required: true },
  bedAmount: { type: Number, required: true },
  bathAmount: { type: Number, required: true },
  otherImages: { type: [String], required: false },
});

module.exports = mongoose.model("Apartment", apartmentSchema);
