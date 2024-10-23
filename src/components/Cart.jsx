import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Cart = () => {
  return (
    <Container className="my-3">
      <h2>Your Cart</h2>
      <Row>
        <Col>
          <p>Your cart is currently empty.</p>
          {/* You can expand this section to display cart items */}
        </Col>
      </Row>
    </Container>
  );
};

export default Cart;
