import React from "react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("TOKEN");
    localStorage.removeItem("EMAIL");
    navigate("/login");
  };

  useEffect(() => {
    const token = localStorage.getItem("TOKEN");

    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="home-container">
      <h1>Welcome to the Home Page</h1>
      <div className="card">
        <h2>Congratulations!</h2>
        <p>You have successfully logged in.</p>
      </div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Home;
