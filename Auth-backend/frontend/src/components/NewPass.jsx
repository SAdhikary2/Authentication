import React from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const NewPass = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(otp, password);
    axios
      .post("http://localhost:8000/api/newPassword", {
        otp: otp,
        password: password,
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.code === 200) {
          navigate("/login");
          alert("Password Updated.");
        } else {
          alert("Server error / Wrong OTP");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <div className="register">
        <form className="mt-5 formsec loginform" onSubmit={handleSubmit}>
          <h2>Reset Password</h2>

          <div className="mb-3">
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="form-control"
              aria-describedby="otpHelp"
              placeholder="Enter Your OTP"
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              aria-describedby="passwordHelp"
              placeholder="Enter New Password"
              required
            />
          </div>

          <button type="submit" className="btn btn-danger">
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewPass;
