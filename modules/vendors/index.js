const vendors = require("./service");
const validators = require("./validator");
const passport = require("passport");
const {uploadFile} = require("../../utils/upload");

module.exports = {
  configure(app) {
    app.get("/api/vendors", vendors.findAll);

    app.post(
      "/api/vendor",
      passport.authenticate("jwt", { session: false }),
      uploadFile,
      validators.addVendorValidator,
      vendors.create
    );

    app.get("/api/vendor", vendors.find);

    app.patch(
      "/api/vendor",
      passport.authenticate("jwt", { session: false }),
      uploadFile,
      validators.updateVendorValidator,
      vendors.update
    );

    app.delete(
      "/api/vendor",
      passport.authenticate("jwt", { session: false }),
      vendors.remove
    );
  },
};
