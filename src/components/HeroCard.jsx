import React from "react";
import "../css/hero-card.css";
import "../css/styleguide.css";

const HeroCard = () => {
  return (
    <>
      <div class="product-container">
        <img
          src="https://res.cloudinary.com/ds83mhjcm/image/upload/v1701948827/FinestMart/spinach_n7jjrt.png"
          alt="fresh-spinach"
        />
        <div class="product-details">
          <p class="product-name">Fresh Spinach</p>
          <p class="product-price">$12.00</p>
        </div>
      </div>
    </>
  );
};

export default HeroCard;
