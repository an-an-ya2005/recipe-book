const express = require("express");
const {
  loginController,
  registerController,
  authController,
  getProfilecontroller,
  // updateProfilecontroller,
} = require("../controller/userCtrl");
const authMiddleware = require("../middlewares/auth");

// Router object
const router = express.Router();

// Routes
//  LOGIN || POST
router.post("/login", loginController);

// REGISTER || POST
router.post("/register", registerController);
router.post("/getUserData", authMiddleware, authController);

router.get("/profile", authMiddleware, getProfilecontroller);
// router.get("/upprofile",authMiddleware,updateProfilecontroller);

module.exports = router;