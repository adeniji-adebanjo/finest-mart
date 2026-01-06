import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import HeroCard from "./HeroCard";

describe("HeroCard", () => {});
it("should render the product image correctly", () => {
  render(
    <Router>
      <HeroCard onAddToCart={() => {}} />
    </Router>
  );
  const image = screen.getByAltText("fresh-spinach");
  expect(image).toBeInTheDocument();
  expect(image).toHaveAttribute(
    "src",
    "https://res.cloudinary.com/ds83mhjcm/image/upload/v1701948827/FinestMart/spinach_n7jjrt.png"
  );
});
