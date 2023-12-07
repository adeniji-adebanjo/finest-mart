import React from "react";
import "../css/hero.css";
import "../css/styleguide.css";
import HeroCard from "./HeroCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const Hero = () => {
  return (
    <div className="hero-container">
      <div className="item">
        <h2>
          Let your <span>groceries</span> come to you
        </h2>
        <p>
          Get fresh groceries online without stepping out to make delicious food
          with the freshest ingredients
        </p>
        <form action="#">
          <input
            type="search"
            name="search"
            placeholder="Search here"
            id="search"
          />
          <FontAwesomeIcon icon={faSearch} className="search-icon" />
        </form>
        <ul>
          <li>Fresh Vegetables</li>
          <li>Cash on Delivery</li>
          <li>100% Delivery</li>
          <li>Fast Delivery</li>
        </ul>
      </div>
      <div className="item">
        <img
          src="https://res.cloudinary.com/ds83mhjcm/image/upload/v1701948865/FinestMart/delivery-man_c4rwd4.png"
          alt="delivery-man"
          width={"500px"}
        />
      </div>
      <div className="item">
        <HeroCard />
        <HeroCard />
      </div>
    </div>
  );
};

export default Hero;
