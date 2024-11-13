// ProductCards.jsx
import React from "react";
import "../css/products-cards.css";
import ProductCardsItem from "./ProductCardsItem";
import { Container, Row, Col, Carousel } from "react-bootstrap";

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
  ];

  return (
    <Container className="my-4">
      {/* Grid display for medium to large screens */}
      <div className="d-none d-md-inline-block product-cards">
        <Row>
          {products.map((product, index) => (
            <Col key={index} md={4} lg={3}>
              <ProductCardsItem {...product} />
            </Col>
          ))}
        </Row>
      </div>

      {/* Carousel for small screens */}
      <Carousel className="d-md-none" controls indicators>
        {products.map((product, index) => (
          <Carousel.Item key={index}>
            <ProductCardsItem {...product} />
          </Carousel.Item>
        ))}
      </Carousel>
    </Container>
  );
};

export default ProductCards;

// Unused array items
// {
//       imageSrc:
//         "https://res.cloudinary.com/ds83mhjcm/image/upload/v1701948824/FinestMart/Dairy_tbfjb5.png",
//       title: "Flour",
//       description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit.",
//     },
