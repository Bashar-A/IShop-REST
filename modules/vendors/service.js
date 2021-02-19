const Vendor = require("./model");
const Product = require("../products/model");
const keys = require("../../keys");
const { deleteFile } = require("../../utils/upload");

async function findAll(req, res) {
  try {
    const { filter = null, skip = null, limit = null } =
      req.body?.vendors?.options || {};

    if (filter)
      Object.keys(filter).forEach((filterKey) => {
        Object.keys(filter[filterKey]).forEach((key) => {
          filter[filterKey][`$${key}`] = filter[filterKey][key];
          delete filter[filterKey][key];
        });
      });

    const vendors = await Vendor.find(filter, null, { skip, limit });

    const totalVendors = Object.keys(vendors).length;

    res.status(200).json({
      vendors,
      totalVendors,
    });
  } catch (e) {
    res.status(400).json({
      error: e.message,
    });
  }
}

async function create(req, res) {
  try {
    const image =
      keys.UPLOAD_DIR + (req.file ? req.file.filename : "default_vendor.jpg");
    const input = req.body?.vendor;
    const vendor = await Vendor.create({ ...input, image });
    await vendor.save();

    res.status(200).json({
      vendor,
    });
  } catch (e) {
    res.status(400).json({
      error: e.message,
    });
  }
}

async function find(req, res) {
  try {
    const id = req.query.id;
    const vendor = await Vendor.findById(id);
    res.status(200).json({
      vendor,
    });
  } catch (e) {
    res.status(400).json({
      error: e.message,
    });
  }
}

async function update(req, res) {
  try {
    const id = req.query.id;
    const input = req.body?.vendor;
    const vendor = await Vendor.findById(id);
    const image = vendor.image;
    if (req.file) {
      image = keys.UPLOAD_DIR + (req.file ? req.file.filename : "default_vendor.jpg");
      deleteFile({ path: image });
    }
    vendor.set({ ...input, image });
    await vendor.save();
    res.status(200).json({
      vendor,
    });
  } catch (e) {
    res.status(400).json({
      error: e.message,
    });
  }
}

async function remove(req, res) {
  try {
    const id = req.query.id;
    const force = req.query.force;
    const vendor = await Vendor.findById(id);

    const products = await Product.find({ vendor: vendor._id });
    if (!products || force === "true") {
      if (vendor) {
        vendor.deleteVendor();
      }
    }

    res.status(200).json({
      vendor,
      products,
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
