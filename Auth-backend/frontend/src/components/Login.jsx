import React, { useState } from "react";

import "./common.css";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate, useLocation, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const REACT_APP_API = "http://localhost:8000";

    try {
      const res = await axios.post(`${REACT_APP_API}/api/login`, {
        email,
        password,
      });
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        navigate(location.state || "/Home");
        localStorage.setItem("TOKEN", res.data.token);
        localStorage.setItem("EMAIL", res.data.email);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Somethings went wrong");
    }
  };

  console.log(process.env.REACT_APP_API);

  return (
    <>
      <div className="register">
        <form className="mt-5 formsec" onSubmit={handleSubmit}>
          <h2>Login</h2>
          <div className="mb-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter Your Email or Username"
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              id="exampleInputPassword"
              aria-describedby="emailHelp"
              placeholder="Enter Your Password"
              required
            />
          </div>

          <button type="submit" className="btn btn-danger registerBtn ">
            Submit
          </button>

          <p>
            Are You a New User ?{" "}
            <Link style={{ textDecoration: "none" }} to="/">
              Sign Up{" "}
            </Link>
          </p>
          <p>
            <Link style={{ textDecoration: "none" }} to="/forgot-password">
              Forgot Password ?
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Login;
