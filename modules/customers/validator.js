const { check } = require("express-validator");
const Customer = require("./model");
const { validationResult } = require("express-validator");

exports.addCustomerValidator = [
  check("customer.firstname")
    .isLength({ min: 2, max: 64 })
    .withMessage("Имя должно состоять минимум из 2 букв"),

  check("customer.lastname")
    .isLength({ min: 2, max: 64 })
    .withMessage("Фамилия должна состоять минимум из 2 букв"),

  check("customer.phone")
    .isMobilePhone("ru-RU")
    .withMessage("Неправильный номер телефона"),

  async function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg });
    }
    next();
  },
];

exports.updateCustomerValidator = [
  check("customer.firstname")
    .isLength({ min: 2, max: 64 })
    .withMessage("Имя должно состоять минимум из 2 букв"),

  check("customer.lastname")
    .isLength({ min: 2, max: 64 })
    .withMessage("Фамилия должна состоять минимум из 2 букв"),

  check("customer.phone")
    .isMobilePhone("ru-RU")
    .withMessage("Неправильный номер телефона"),

  async function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg });
    }
    next();
  },
];
