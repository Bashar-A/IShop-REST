const { check } = require("express-validator");
const Product = require("./model");
const { validationResult } = require("express-validator");
const {deleteFile} = require('../../utils/upload')

exports.addProductValidator = [
  async function (req, res, next) {
    req.body.product = JSON.parse(req.body?.product);
    next();
  },

  check("product.name")
    .isLength({ min: 2, max: 64 })
    .withMessage("Имя товара должно состоять минимум из 2 букв")
    .custom(async (value, { req }) => {
      try {
        const product = await Product.findOne({ name: value });
        if (product) return Promise.reject("Такой товар уже существует");
      } catch (e) {
        console.log(e);
      }
    }),

  async function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      req.files.forEach(async file => {
        await deleteFile(file);
      });
      return res.status(400).json({ message: errors.array()[0].msg });
    }
    next();
  },
];
