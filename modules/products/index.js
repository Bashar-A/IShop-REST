const products = require("./service");
const validators = require("./validator");
const passport = require("passport");
const { uploadFiles } = require("../../utils/upload");

module.exports = {
  configure(app) {
    app.get("/api/products", products.findAll);

    app.post(
      "/api/product",
      passport.authenticate("jwt", { session: false }),
      uploadFiles,
      validators.addProductValidator,
      products.create
    );

    app.get("/api/product", products.find);

    app.patch(
      "/api/product",
      passport.authenticate("jwt", { session: false }),
      uploadFiles,
      validators.updateProductValidator,
      products.update
    );

    app.delete(
      "/api/product",
      passport.authenticate("jwt", { session: false }),
      products.remove
    );
  },
};
