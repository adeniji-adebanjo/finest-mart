import React from "react";
import "../css/products-cards.css";
import ProductCardsItem from "./ProductCardsItem";

// const ProductCards = () => {
//   return (
//     <>
//       <div className="product-cards">
//         <ProductCardsItem />
//         <ProductCardsItem />
//         <ProductCardsItem />
//         <ProductCardsItem />
//         <ProductCardsItem />
//       </div>
//     </>
//   );
// };

const ProductCards = () => {
  const products = [
    {
      imageSrc:
        "https://res.cloudinary.com/ds83mhjcm/image/upload/v1701948824/FinestMart/Dairy_tbfjb5.png",
      title: "Dairy Products",
      description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit.",
    },
    {
      imageSrc:
        "https://res.cloudinary.com/ds83mhjcm/image/upload/v1701948824/FinestMart/Dairy_tbfjb5.png",
      title: "Vegetables and Fruits",
      description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit.",
    },
    {
      imageSrc:
        "https://res.cloudinary.com/ds83mhjcm/image/upload/v1701948824/FinestMart/Dairy_tbfjb5.png",
      title: "Spices and Seasoning",
      description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit.",
    },
    {
      imageSrc:
        "https://res.cloudinary.com/ds83mhjcm/image/upload/v1701948824/FinestMart/Dairy_tbfjb5.png",
      title: "Honey",
      description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit.",
    },
    {
      imageSrc:
        "https://res.cloudinary.com/ds83mhjcm/image/upload/v1701948824/FinestMart/Dairy_tbfjb5.png",
      title: "Flour",
      description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit.",
    },
  ];

  return (
    <div className="product-cards">
      {products.map((product, index) => (
        <ProductCardsItem key={index} {...product} />
      ))}
    </div>
  );
};

export default ProductCards;
