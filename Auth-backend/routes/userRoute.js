const express = require("express");
const router = express.Router();
const {
  registerController,
  loginController,
  forgotPasswordController,
  submitotp,
} = require("../controllers/userController");

router.post("/signup", registerController);
router.post("/login", loginController);
router.post("/forgot-password", forgotPasswordController);
router.post("/newPassword", submitotp);

module.exports = router;
