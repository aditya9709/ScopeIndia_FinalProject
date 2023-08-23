import React from "react";
import { Link } from "react-router-dom";
import logoImage from "../images/company-logo.jpeg";

const Header = () => {
  return (
    <header>
      <div className="logo">
        <img
          src={logoImage}
          alt="Company Logo"
        />{" "}
      </div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About Us</Link>
          </li>
          <li>
            <Link to="/contact">Contact Us</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
