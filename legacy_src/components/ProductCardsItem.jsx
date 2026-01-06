import React from "react";
import PropTypes from "prop-types";
import "../css/products-cards.css";

const ProductCardsItem = ({ imageSrc, title, description }) => {
  return (
    <div className="products">
      <img src={imageSrc} width={"50px"} height={"50px"} alt={title} />
      <h6>{title}</h6>
      <p>{description}</p>
    </div>
  );
};

ProductCardsItem.propTypes = {
  imageSrc: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default ProductCardsItem;
