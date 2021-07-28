const mongoose = require("mongoose");

const shopSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  postalcode: { type: String, required: true },
  lat: mongoose.Schema.Types.Decimal128,
  lng: mongoose.Schema.Types.Decimal128
});

const Shop = mongoose.model("Shop", shopSchema);

module.exports = Shop;