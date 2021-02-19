const { check } = require("express-validator");
const Vendor = require("./model");
const { validationResult } = require("express-validator");
const {deleteFile} = require('../../utils/upload')


exports.addVendorValidator = [
  async function (req, res, next) {
    if(req.body?.vendor)
      req.body.vendor = JSON.parse(req.body?.vendor);
    next();
  },

  check("vendor.name")
    .isLength({ min: 2, max: 64 })
    .withMessage("Имя производителя должно состоять минимум из 2 букв")
    .custom(async (value, { req }) => {
      try {
        const vendor = await Vendor.findOne({ name: value });
        if (vendor) return Promise.reject("Такой производитель уже существует");
      } catch (e) {
        console.log(e);
      }
    }),

  async function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      if(req.file)await deleteFile(req.file);
      return res.status(400).json({ message: errors.array()[0].msg });
    }
    next();
  },
];
