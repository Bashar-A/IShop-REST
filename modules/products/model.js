const { Schema, model } = require("mongoose");
const { deleteFile } = require("../../utils/upload");

const Product = new Schema(
  {
    name: String,
    priceExVat: Number,
    promoPrice: Number,
    category: { type: Schema.Types.ObjectId, ref: "Category" },
    vendor: { type: Schema.Types.ObjectId, ref: "Vendor" },
    model: { type: Schema.Types.ObjectId, ref: "Model" },
    attributes: [
      {
        attribute: { type: Schema.Types.ObjectId, ref: "Attribute" },
        value: String,
      },
    ],
    images: [String],
    stock: Number,
    onSale: Boolean,
  },
  {
    timestamps: true,
  }
);

Product.methods.getCurrentPrice = async function () {
  return promoPrice? promoPrice: priceExVat
};

Product.methods.deleteProduct = async function () {
  this.images.forEach((image) => {
    this.deleteImage(image);
  });
  this.delete();
};

Product.methods.deleteImage = async function (image) {
  if (image === keys.UPLOAD_DIR + "default.jpg") return;
  deleteFile({ path: image });
};

module.exports = model("Product", Product);
