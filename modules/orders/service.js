const Order = require("./model");
const Customer = require("../customers/model");

async function findAll(req, res) {
  try {
    const { filter = null, skip = null, limit = null } =
      req.body?.orders?.options || {};

    if (filter)
      Object.keys(filter).forEach((filterKey) => {
        Object.keys(filter[filterKey]).forEach((key) => {
          filter[filterKey][`$${key}`] = filter[filterKey][key];
          delete filter[filterKey][key];
        });
      });

    const orders = await Order.find(filter, null, { skip, limit });

    const totalOrders = Object.keys(orders).length;

    res.status(200).json({
      orders,
      totalOrders,
    });
  } catch (e) {
    res.status(400).json({
      error: e.message,
    });
  }
}

async function create(req, res) {
  try {
    const { paymentType, address, comments, orderItems } = req.body?.order;
    const customerInput = req.body?.customer;

    const customer = await Customer.create(customerInput);

    const order = await Order.create({
      customer: customer._id,
      paymentType,
      address,
      comments,
      orderItems,
    });
    order.calculateOrder()



    await order.save();

    res.status(200).json({
      order,
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
    const order = await Order.findById(id);
    res.status(200).json({
      order,
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
    const input = req.body?.order;
    const order = await Order.findById(id);
    order.set(input);
    await order.save();
    res.status(200).json({
      order,
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
    const order = await Order.findByIdAndDelete(id);

    res.status(200).json({
      order,
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
