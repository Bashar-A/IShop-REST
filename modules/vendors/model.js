const { Schema, model } = require("mongoose");
const {deleteFile} = require("../../utils/upload")

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

Vendors.methods.deleteVendor = function () {
  this.products.forEach((product) => {
    product.deleteProduct();
  });
  deleteFile({ path: vendor.image });
  this.delete();
};

module.exports = model("Vendors", Vendors);
