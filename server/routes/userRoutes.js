const express = require("express");
const {
  loginController,
  registerController,
  authController,
  getProfilecontroller,
} = require("../controller/userCtrl");
const Authenticate = require("../middlewares/auth"); // Ensure correct import

// Router object
const router = express.Router();

// LOGIN || POST
router.post("/login", loginController);
// REGISTER || POST
router.post("/register", registerController);
router.post("/getUserData", Authenticate, authController);

// Profile || GET
router.get("/profile", Authenticate, getProfilecontroller);

module.exports = router;

// const express = require("express");
// const {
//   loginController,
//   registerController,
//   authController,
//   getProfilecontroller,
// } = require("../controller/userCtrl");
// const Authenticate = require("../middlewares/auth");

// const router = express.Router();

// // Auth routes
// router.post("/login", loginController);
// router.post("/register", registerController);
// router.post("/getUserData", Authenticate, authController);
// router.get("/profile", Authenticate, getProfilecontroller);

// module.exports = router;
