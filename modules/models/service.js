const Model = require("./model");

async function findAll(req, res) {
  try {
    const { filter = null, skip = null, limit = null } =
      req.body?.models?.options || {};

    if (filter)
      Object.keys(filter).forEach((filterKey) => {
        Object.keys(filter[filterKey]).forEach((key) => {
          filter[filterKey][`$${key}`] = filter[filterKey][key];
          delete filter[filterKey][key];
        });
      });

    const models = await Model.find(filter, null, { skip, limit });

    const totalModels = Object.keys(models).length;

    res.status(200).json({
      models,
      totalmodels,
    });
  } catch (e) {
    res.status(400).json({
      error: e.message,
    });
  }
}

async function create(req, res) {
  try {
    const input = req.body?.model;
    const model = await Model.create(input);
    await model.save();

    res.status(200).json({
      model,
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
    const model = await Model.findById(id);
    res.status(200).json({
      model,
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
    const input = req.body?.model;
    const model = await Model.findById(id);
    model.set(input);
    await model.save();
    res.status(200).json({
      model,
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
    const model = await Model.findByIdAndDelete(id);

    res.status(200).json({
      model,
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
