const Customer = require("./model");

async function findAll(req, res) {
  try {
    const { filter = null, skip = null, limit = null } =
      req.body?.customers?.options || {};

    if (filter)
      Object.keys(filter).forEach((filterKey) => {
        Object.keys(filter[filterKey]).forEach((key) => {
          filter[filterKey][`$${key}`] = filter[filterKey][key];
          delete filter[filterKey][key];
        });
      });

    const customers = await Customer.find(filter, null, { skip, limit });

    const totalCustomers = Object.keys(customers).length;

    res.status(200).json({
      customers,
      totalCustomers,
    });
  } catch (e) {
    res.status(400).json({
      error: e.message,
    });
  }
}

async function create(req, res) {
  try {
    const input = req.body?.customer;
    const customer = await Customer.create(input);
    await customer.save();

    res.status(200).json({
      customer,
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
    const customer = await Customer.findById(id);
    res.status(200).json({
      customer,
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
    const input = req.body?.customer;
    const customer = await Customer.findById(id);
    customer.set(input);
    await customer.save();
    res.status(200).json({
      customer,
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
    const customer = await Customer.findByIdAndDelete(id);

    res.status(200).json({
      customer,
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
