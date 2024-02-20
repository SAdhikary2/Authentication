import React, { useState } from "react";
import "./common.css";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const Forgot = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const location = useLocation();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email);
    axios
      .post("http://localhost:8000/api/forgot-password", {
        email: email,
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.code === 200) {
          navigate((location.state && location.state.from) || "/newPassword");
        } else {
          alert("Email / Server Error.");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="register">
        <form className="mt-5 formsec loginform" onSubmit={handleSubmit}>
          <h2>Reset Password</h2>

          <div className="mb-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter Your Email"
              required
            />
          </div>

          <button type="submit" className="btn btn-danger registerBtn">
            GET OTP
          </button>
        </form>
      </div>
    </>
  );
};

export default Forgot;
