const Product = require("./model");
const keys = require("../../keys");
const { deleteFile } = require("../../utils/upload");

async function findAll(req, res) {
  try {
    const { filter = null, skip = null, limit = null } =
      req.body?.products?.options || {};

    if (filter)
      Object.keys(filter).forEach((filterKey) => {
        Object.keys(filter[filterKey]).forEach((key) => {
          filter[filterKey][`$${key}`] = filter[filterKey][key];
          delete filter[filterKey][key];
        });
      });

    const products = await Product.find(filter, null, { skip, limit });

    const totalProducts = Object.keys(products).length;

    res.status(200).json({
      products,
      totalProducts,
    });
  } catch (e) {
    res.status(400).json({
      error: e.message,
    });
  }
}

async function create(req, res) {
  try {
    let images = [];
    req.files.forEach((file) => {
      images.push(keys.UPLOAD_DIR + file.filename);
    });
    if (images.length === 0)
      images.push(keys.UPLOAD_DIR + "default_product.jpg");
    const input = req.body?.product;
    const product = await Product.create({ ...input, images });
    await product.save();

    res.status(200).json({
      product,
    });
  } catch (e) {
    res.status(400).json({
      error: e.message,
    });
  }
}

async function find(req, res) {
  try {
    const id = req.query?.id;
    const product = await Product.findById(id);
    res.status(200).json({
      product,
    });
  } catch (e) {
    res.status(400).json({
      error: e.message,
    });
  }
}

async function update(req, res) {
  try {
    const id = req.query?.id;
    const input = req.body?.product;
    const product = await Product.findById(id);

    product.images.forEach((image) => {
      if (!input.images.includes(image)) deleteFile({ path: image });
    });
    req.files.forEach((file) => {
      input.images.push(keys.UPLOAD_DIR + file.filename);
    });
    if (input.images.length === 0)
      images.push(keys.UPLOAD_DIR + "default_product.jpg");

    product.set(input);
    await product.save();
    res.status(200).json({
      product,
    });
  } catch (e) {
    res.status(400).json({
      error: e.message,
    });
  }
}

async function remove(req, res) {
  try {
    const id = req.query?.id;
    const product = await Product.findByIdAndDelete(id);
    if (products) {
      product.images.forEach((image) => {
        deleteFile({ path: image });
      });
    }

    res.status(200).json({
      product,
    });
  } catch (e) {
    res.status(400).json({
      error: e.message,
    });
  }
}

module.exports = {
  findAll,
  create,
  find,
  update,
  remove,
};
