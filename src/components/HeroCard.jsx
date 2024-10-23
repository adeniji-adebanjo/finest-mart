import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import "../css/hero-card.css";
import "../css/styleguide.css";

const HeroCard = ({ onAddToCart }) => {
  const [inCart, setInCart] = useState(false);

  const handleAddToCart = () => {
    setInCart(true);
    onAddToCart(); // Increment cart count in the parent component
  };

  return (
    <div className="product-container">
      <img
        src="https://res.cloudinary.com/ds83mhjcm/image/upload/v1701948827/FinestMart/spinach_n7jjrt.png"
        alt="fresh-spinach"
      />
      <div className="product-details">
        <p className="product-name">Fresh Spinach</p>
        <p className="product-price">$12.00</p>
        {inCart ? (
          // Wrap the View Cart button in a Link component
          <Link to="/cart" className="view-cart">
            <button className="add-to-cart">
              <FontAwesomeIcon icon={faShoppingCart} /> View Cart
            </button>
          </Link>
        ) : (
          <button
            className="add-to-cart"
            onClick={handleAddToCart}
            style={{ cursor: "pointer" }}
          >
            <FontAwesomeIcon icon={faShoppingCart} /> Add to cart
          </button>
        )}
      </div>
    </div>
  );
};

export default HeroCard;
