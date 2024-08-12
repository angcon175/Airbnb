const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    url: {
      type: String,
      default: "https://images.app.goo.gl/E2zB9ReAESQvm46v9",
      set: (v) =>
        v === "" ? "https://images.app.goo.gl/E2zB9ReAESQvm46v9" : v,
    },
  },
  price: Number,
  location: String,
  country: String,
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
