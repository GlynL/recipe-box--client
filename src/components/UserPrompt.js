import React from "react";
import { Link } from "react-router-dom";
import "../styles/components/Home.scss";

const UserPrompt = () => (
  <div className="home-display">
    <p>Login or create an account to start adding recipes.</p>
    <div>
      <Link className="btn" to="/users/login">
        Login
      </Link>
      <Link className="btn" to="/users/register">
        Signup
      </Link>
    </div>
  </div>
);

export default UserPrompt;
