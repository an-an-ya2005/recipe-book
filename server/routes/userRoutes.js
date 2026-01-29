const express = require("express");
const {
  loginController,
  registerController,
  getUserDataController,
  getProfilecontroller,
  updateAvatarController,
} = require("../controller/userCtrl");
const Authenticate = require("../middlewares/auth");

const router = express.Router();

// LOGIN || POST
router.post("/login", loginController);

// REGISTER || POST
router.post("/register", registerController);

// Get user data || POST
router.post("/getUserData", Authenticate, getUserDataController);

// Profile || GET
router.get("/profile", Authenticate, getProfilecontroller);

// Update avatar || PUT
router.put("/updateAvatar", Authenticate, updateAvatarController);

module.exports = router;
