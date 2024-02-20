import React, { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";
import "./common.css";

const Register = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true); // State to track password match
  const [passwordsMatchMessage, setPasswordsMatchMessage] = useState(""); // State to track password match message
  const [verificationSent, setVerificationSent] = useState(false); // State to track whether verification email has been sent
  const [otp, setOtp] = useState(""); // State to track OTP
  const [otpVerified, setOtpVerified] = useState(false); // State to track whether OTP has been verified
  const [verificationToken, setVerificationToken] = useState(""); // State to track verification token
  const navigate = useNavigate();

  const handleConfirmPasswordChange = (e) => {
    const { value } = e.target;
    setConfirmPassword(value);

    // Check if passwords match
    if (password !== value) {
      setPasswordMatch(false);
      setPasswordsMatchMessage("");
    } else {
      setPasswordMatch(true);
      setPasswordsMatchMessage("Password match");
    }
  };

  const handleVerifyEmail = async () => {
    const REACT_APP_API = "http://localhost:8000";
    try {
      const res = await axios.post(`${REACT_APP_API}/api/send-otp-email`, {
        email,
      });
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        setVerificationSent(true);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const handleVerifyOtp = async () => {
    const REACT_APP_API = "http://localhost:8000";
    try {
      const res = await axios.post(`${REACT_APP_API}/api/verify-otp`, {
        email,
        otp,
      });
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        setOtpVerified(true);
        setVerificationToken(res.data.token);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if OTP has been verified
    if (!otpVerified) {
      toast.error("Please verify your OTP before completing registration.");
      return;
    }

    setPasswordMatch(true);
    setPasswordsMatchMessage("Password match");

    const REACT_APP_API = "http://localhost:8000";
    //for posting register data
    try {
      const res = await axios.post(`${REACT_APP_API}/api/signup`, {
        email,
        username,
        password,
        role,
        otpToken: verificationToken,
      });
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <div className="register">
        <form className="mt-5 formsec" onSubmit={handleSubmit}>
          <h2>Registration</h2>
          <div className="mb-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              placeholder="Enter Email"
              required
            />
          </div>
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleVerifyEmail}
            disabled={verificationSent}
          >
            {verificationSent ? "OTP Sent" : "Verify"}
          </button>
          {verificationSent && (
            <div className="mb-3">
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="form-control"
                placeholder="Enter OTP"
                required
              />
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleVerifyOtp}
                disabled={!otp}
              >
                Verify OTP
              </button>
            </div>
          )}
          <div className="mb-3">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="form-control"
              placeholder="Enter Your Username"
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              placeholder="Enter Your Password"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              className="form-control"
              placeholder="Confirm Password"
              name="confirmPassword" // Adding name attribute
              required
            />
            {!passwordMatch && (
              <p style={{ color: "red" }}>Passwords do not match</p>
            )}
            {passwordsMatchMessage && (
              <p style={{ color: "green" }}>{passwordsMatchMessage}</p>
            )}
          </div>
          <div className="mb-3">
            <Form.Select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="form-control"
            >
              <option value="">Select Role</option>
              <option value="user">User</option>
              <option value="staff">Staff</option>
              <option value="admin">Admin</option>
            </Form.Select>
          </div>

          <button type="submit" className="btn btn-danger registerBtn">
            Submit
          </button>
          <p>
            Do you already have an account?{" "}
            <Link style={{ textDecoration: "none" }} to="/login">
              Login
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Register;