const { Schema, model } = require("mongoose");

const Model = new Schema(
  {
    name: String,
    description: String,
    vendor: { type: Schema.Types.ObjectId, ref: "Vendor" },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Model", Model);
