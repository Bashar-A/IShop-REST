const { Schema, model } = require("mongoose");

const Vendors = new Schema(
  {
    name: String,
    description: String,
    image: String,
  },
  {
    timestamps: true,
  }
);

module.exports = model("Vendors", Vendors);
