const categories = require("./service");
const validators = require("./validator");
const passport = require("passport");

module.exports = {
  configure(app) {
    app.get("/api/categories", categories.findAll);

    app.post(
      "/api/category",
      passport.authenticate("jwt", { session: false }),
      validators.addCategoryValidator,
      categories.create
    );

    app.get("/api/category", categories.find);

    app.patch(
      "/api/category",
      passport.authenticate("jwt", { session: false }),
      validators.updateCategoryValidator,
      categories.update
    );

    app.delete(
      "/api/category",
      passport.authenticate("jwt", { session: false }),
      categories.remove
    );
  },
};
