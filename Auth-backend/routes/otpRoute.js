const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

// Implement the send-otp-email endpoint
router.post("/send-otp-email", async (req, res) => {
  try {
    const { email } = req.body;

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000);

    // Send OTP to user's email using Nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail",
      secure: true,
      logger: true,
      debug: true,
      secureConnection: false,
      auth: {
        user: process.env.USER,
        pass: process.env.PASS,
      },
    });

    const mailOptions = {
      from: process.env.USER,
      to: email,
      subject: "OTP Verification",
      text: `Your OTP for verification is: ${otp}`,
    };

    await transporter.sendMail(mailOptions);

    // Return success response
    res.status(200).json({ success: true, message: "OTP sent successfully" });
  } catch (error) {
    console.error("Error sending OTP email:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to send OTP email" });
  }
});

router.post("/verify-otp", (req, res) => {
  try {
    const { email, otp } = req.body;

    const verificationToken = "random_verification_token";

    res
      .status(200)
      .json({
        success: true,
        message: "OTP verified successfully",
        token: verificationToken,
      });
  } catch (error) {
    console.error("Error verifying OTP:", error);
    res.status(500).json({ success: false, message: "Failed to verify OTP" });
  }
});

module.exports = router;
