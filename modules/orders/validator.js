const { check } = require("express-validator");
const Order = require("./model");
const { PaymentTypes } = require("./model");
const { validationResult } = require("express-validator");

exports.addOrderValidator = [
  check("order.orderItems")
    .isLength({ min: 1, max: 64 })
    .withMessage("Корзина не может быть пустой"),

  check("order.address")
    .isLength({ min: 1, max: 256 })
    .withMessage("Адрес не может быть пустым"),

  check("order.paymentType").custom(async (value, { req }) => {
    try {
      if (!PaymentTypes.includes(value)) return Promise.reject(PaymentTypes);
    } catch (e) {
      console.log(e);
    }
  }),

  async function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg });
    }
    next();
  },
];

exports.updateOrderValidator = [
  check("order.orderItems")
    .isLength({ min: 1, max: 64 })
    .withMessage("Корзина не может быть пустой"),

  check("order.address")
    .isLength({ min: 1, max: 256 })
    .withMessage("Адрес не может быть пустым"),

  check("order.paymentType").custom(async (value, { req }) => {
    try {
      if (!PaymentTypes.includes(value)) return Promise.reject(PaymentTypes);
    } catch (e) {
      console.log(e);
    }
  }),

  async function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg });
    }
    next();
  },
];
