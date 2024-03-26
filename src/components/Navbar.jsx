import React, { useState } from "react";
import "../css/navbar.css";
import "../css/styleguide.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingBag,
  faBars,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };
  return (
    <header>
      <nav>
        <div className="logo">
          <h4>
            Finest<span>Mart</span>
          </h4>
        </div>
        <div className={`menu ${isMenuOpen ? "open" : ""}`}>
          <a href="/">Home</a>
          <a href="/">Categories</a>
          <a href="/">Sales</a>
          <a href="/">FAQs</a>
          <a href="/">About</a>
          <a href="/">Contact</a>
          <button id="signin">Sign In</button>
          <button id="signup">Sign Up</button>
        </div>
        <div className="btn">
          <FontAwesomeIcon
            icon={faBars}
            className="hamburger-icon"
            onClick={toggleMenu}
          />
          <FontAwesomeIcon icon={faShoppingBag} />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
