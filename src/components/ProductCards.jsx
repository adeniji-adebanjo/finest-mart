import React from "react";
import "../css/products-cards.css";
import ProductCardsItem from "./ProductCardsItem";

const ProductCards = () => {
  return (
    <>
      <div className="product-cards">
        <ProductCardsItem />
        <ProductCardsItem />
        <ProductCardsItem />
        <ProductCardsItem />
        <ProductCardsItem />
      </div>
    </>
  );
};

export default ProductCards;
