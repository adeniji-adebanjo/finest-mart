import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, ListGroup } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebaseConfig"; // Import db from firebaseConfig
import { doc, getDoc, setDoc } from "firebase/firestore"; // Import Firestore methods
import Swal from "sweetalert2";

const CartPage = () => {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      const user = auth.currentUser;
      if (user) {
        // Fetch cart from Firestore if the user is logged in
        const cartRef = doc(db, "carts", user.uid); // Using doc() instead of collection()
        const cartDoc = await getDoc(cartRef); // Using getDoc() to retrieve the document
        if (cartDoc.exists()) {
          setCart(cartDoc.data().items); // Use the data from the document
        }
      } else {
        // Fetch cart from localStorage if the user is not logged in
        const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCart(savedCart);
      }
    };
    fetchCart();
  }, []);

  const handleRemoveItem = (productId) => {
    const updatedCart = cart.filter((item) => item.id !== productId);
    setCart(updatedCart);

    const user = auth.currentUser;
    if (user) {
      const cartRef = doc(db, "carts", user.uid);
      setDoc(cartRef, { items: updatedCart }); // Using setDoc() to update the Firestore document
    } else {
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      Swal.fire({
        icon: "warning",
        title: "Empty Cart",
        text: "Please add some products to your cart before proceeding.",
      });
      return;
    }
    navigate("/checkout");
  };

  return (
    <Container>
      <Row>
        <Col md={12}>
          <h2>Your Cart</h2>
          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <ListGroup>
              {cart.map((item) => (
                <ListGroup.Item key={item.id}>
                  <Row>
                    <Col md={3}>
                      <img
                        src={item.image}
                        alt={item.name}
                        className="img-fluid"
                      />
                    </Col>
                    <Col md={6}>
                      <h5>{item.name}</h5>
                      <p>${item.price}</p>
                    </Col>
                    <Col md={3}>
                      <Button
                        variant="danger"
                        onClick={() => handleRemoveItem(item.id)}
                      >
                        <FaTrash />
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={12} className="d-flex justify-content-end">
          <Button variant="primary" onClick={handleCheckout}>
            Proceed to Checkout
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default CartPage;
