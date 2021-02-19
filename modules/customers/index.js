const customers = require("./service");
const validators = require("./validator");
const passport = require("passport");

module.exports = {
  configure(app) {
    app.get("/api/customers", customers.findAll);

    app.post(
      "/api/customer",
      passport.authenticate("jwt", { session: false }),
      validators.addCustomerValidator,
      customers.create
    );

    app.get("/api/customer", customers.find);

    app.patch(
      "/api/customer",
      passport.authenticate("jwt", { session: false }),
      validators.updateCustomerValidator,
      customers.update
    );

    app.delete(
      "/api/customer",
      passport.authenticate("jwt", { session: false }),
      customers.remove
    );
  },
};
