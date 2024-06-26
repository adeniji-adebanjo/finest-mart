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
          with the freshest ingredients.
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
        <div class="svg-container">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="483"
            height="511"
            viewBox="0 0 483 511"
            fill="none"
            class="svg-background"
          >
            <path
              d="M99.0672 24.3788C103.57 7.57459 120.842 -2.39777 137.647 2.10489L458.961 88.2008C475.765 92.7035 485.737 109.976 481.235 126.78L384.732 486.934C380.229 503.738 362.957 513.71 346.152 509.208L24.8382 423.112C8.03398 418.609 -1.93833 401.337 2.56433 384.532L99.0672 24.3788Z"
              stroke="#F0B70D"
            />
          </svg>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="457"
            height="457"
            viewBox="0 0 457 457"
            fill="none"
            class="svg-background"
          >
            <path
              d="M217.52 9.98096C229.821 -2.32055 249.766 -2.32054 262.067 9.98097L446.338 194.252C458.64 206.553 458.64 226.498 446.338 238.8L238.8 446.338C226.498 458.64 206.553 458.64 194.252 446.338L9.981 262.067C-2.32052 249.766 -2.3205 229.821 9.98102 217.52L217.52 9.98096Z"
              stroke="#F38160"
            />
          </svg>

          <img
            src="https://res.cloudinary.com/ds83mhjcm/image/upload/v1701948865/FinestMart/delivery-man_c4rwd4.png"
            alt="delivery-man"
            width="500px"
            class="delivery-image"
          />
        </div>
      </div>
      <div className="item">
        <HeroCard />
        <HeroCard />
      </div>
    </div>
  );
};

export default Hero;
