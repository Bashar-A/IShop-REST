const { Schema, model } = require("mongoose");
const { deleteFile } = require("../../utils/upload");
const keys = require("../../keys");

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

Vendors.methods.deleteVendor = async function () {
  this.products?.forEach((product) => {
    product.deleteProduct();
  });
  this.deleteImage(this.image);
  this.delete();
};

Vendors.methods.deleteImage = async function (image) {
  if (image === keys.UPLOAD_DIR + "default.jpg") return;
  deleteFile({ path: image });
};

module.exports = model("Vendors", Vendors);
