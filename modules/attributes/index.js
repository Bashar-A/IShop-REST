const attributes = require("./service");
const validators = require("./validator");
const passport = require("passport");

module.exports = {
  configure(app) {
    app.get("/api/attributes", attributes.findAll);

    app.post(
      "/api/attribute",
      passport.authenticate("jwt", { session: false }),
      validators.addAttributeValidator,
      attributes.create
    );

    app.get("/api/attribute", attributes.find);

    app.patch(
      "/api/attribute",
      passport.authenticate("jwt", { session: false }),
      validators.addAttributeValidator,
      attributes.update
    );

    app.delete(
      "/api/attribute",
      passport.authenticate("jwt", { session: false }),
      attributes.remove
    );
  },
};
