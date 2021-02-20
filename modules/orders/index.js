const orders = require("./service");
const validators = require("./validator");
const passport = require("passport");

module.exports = {
  configure(app) {
    app.get(
      "/api/orders",
      passport.authenticate("jwt", { session: false }),
      orders.findAll
    );

    app.post(
      "/api/order",
      validators.addOrderValidator,
      orders.create
    );

    app.get("/api/order", orders.find);

    app.patch(
      "/api/order",
      passport.authenticate("jwt", { session: false }),
      validators.updateOrderValidator,
      orders.update
    );

    app.delete(
      "/api/order",
      passport.authenticate("jwt", { session: false }),
      orders.remove
    );
  },
};
