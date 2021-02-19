const { Schema, model } = require("mongoose");
const {deleteFile} = require("../../utils/upload")

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

Product.methods.deleteProduct = function(){
    this.images.forEach((image) => {
        deleteFile({ path: image });
      });
      this.delete();
}

module.exports = model("Product", Product);
