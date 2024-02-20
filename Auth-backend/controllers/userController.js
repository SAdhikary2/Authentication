const userModel = require("../modals/user");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer"); // Import Nodemailer
const bcrypt = require("bcryptjs");

const registerController = async (req, res) => {
  try {
    const { email, username, password, role } = req.body;
    if (!email) {
      return res.status(400).send({ msg: "Please provide email" });
    }
    if (!username) {
      return res.status(400).send({ msg: "Username is required" });
    }
    if (!password) {
      return res
        .status(400)
        .send({ msg: `Password for ${username} is required` });
    }

    //Checking if the user already exists in the database
    const exists = await userModel.findOne({ $or: [{ email }, { username }] });

    if (exists) {
      return res
        .status(409)
        .send({ msg: "User with this email or username already exists." });
    }

    //Creating a new user and hashing the password using bcrypt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = new userModel({
      email,
      username: username.toLowerCase(),
      password: hashedPassword,
      role: role ? role : "user",
    });
    //Saving the user to the database
    await user.save();
    //Returning the token upon successful registration
    res.status(201).send({
      success: true,
      message: "User Registered Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in registration",
      error,
    });
  }
};

// for login
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    //Getting the user from the database by his/her email
    const user = await userModel.findOne({ email }).select("+password");
    //If no user found returning error message
    if (!user) return res.status(400).json({ msg: "No User Found" });
    //Checking if the password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid Password" });
    //creating token
    const token = await jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).send({
      success: true,
      message: "Login Successfully",
      email: user.email,
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error Occurring during login",
      error,
    });
  }
};

//for forgot password
const forgotPasswordController = async (req, res) => {
  const _otp = Math.floor(100000 + Math.random() * 900000);
  let user = await userModel.findOne({ email: req.body.email });

  if (!user) {
    res.send({ code: 500, message: "User not found" });
    return;
  }

  let transporter = nodemailer.createTransport({
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

  try {
    let info = await transporter.sendMail({
      from: process.env.USER,
      to: req.body.email,
      subject: "OTP",
      text: String(_otp),
      html: `<html><body>Here is the recovery password otp ${_otp}</body></html>`,
    });

    if (info.messageId) {
      await userModel.updateOne({ email: req.body.email }, { otp: _otp });
      res.send({ code: 200, message: "OTP sent" });
    } else {
      res.send({ code: 500, message: "Server error" });
    }
  } catch (error) {
    console.error("Error sending email:", error);
    res.send({ code: 500, message: "Server error" });
  }
};

const submitotp = async (req, res) => {
  console.log(req.body);

  try {
    const result = await userModel.findOne({ otp: req.body.otp });
    if (result) {
      // Hash the new password
      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      // Update the password
      await userModel.updateOne(
        { email: result.email },
        { $set: { password: hashedPassword } }
      );
      res.send({ code: 200, message: "Password updated" });
    } else {
      res.status(404).send({ code: 404, message: "OTP is wrong" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({ code: 500, message: "Server error" });
  }
};

module.exports = {
  registerController,
  loginController,
  forgotPasswordController,
  submitotp,
};
