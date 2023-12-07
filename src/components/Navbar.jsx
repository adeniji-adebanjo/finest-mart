import React from "react";
import "../css/navbar.css";
import "../css/styleguide.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingBag } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  return (
    <header>
      <nav>
        <div className="logo">
          <h4>
            Finest<span>Mart</span>
          </h4>
        </div>
        <div className="menu">
          <a
            href="/"
            className="active"
            target="_blank"
            rel="noopener noreferrer"
          >
            Home
          </a>
          <a href="/" target="_blank" rel="noopener noreferrer">
            Categories
          </a>
          <a href="/" target="_blank" rel="noopener noreferrer">
            Sales
          </a>
          <a href="/" target="_blank" rel="noopener noreferrer">
            FAQs
          </a>
          <a href="/" target="_blank" rel="noopener noreferrer">
            About
          </a>
          <a href="/" target="_blank" rel="noopener noreferrer">
            Contact
          </a>
        </div>
        <div className="btn">
          <FontAwesomeIcon icon={faShoppingBag} />
          <button className="signin">Sign In</button>
          <button className="signup">Sign Up</button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
