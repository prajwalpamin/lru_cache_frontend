// Navbar.js

import React from "react";
import "./navbar.css"; // Import CSS file for styling

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h1 className="navbar-logo">Apica</h1>
        <ul className="nav-menu">
          <li className="nav-item">
            <a href="/" className="nav-links">
              Home
            </a>
          </li>
          <li className="nav-item">
            <a href="/about" className="nav-links">
              About
            </a>
          </li>
          <li className="nav-item">
            <a href="/services" className="nav-links">
              Services
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
