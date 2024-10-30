import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Button, Form, Navbar } from "react-bootstrap"; // Import necessary Bootstrap components
import { auth } from "../firebaseConfig"; // Import Firebase auth
import { createUserWithEmailAndPassword } from "firebase/auth"; // Import method for user registration
// import "../css/signup.css";

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState(""); // State for error handling
  const [loading, setLoading] = useState(false); // State for loading status

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    const { email, password } = formData;

    try {
      // Create a new user with Firebase
      await createUserWithEmailAndPassword(auth, email, password);
      console.log("User signed up successfully!");
      // You can redirect or perform any other actions here
    } catch (error) {
      setError(error.message); // Set error message
      console.error("Error signing up:", error.message);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <Container className="signup-container">
      <Row>
        {/* First Column */}
        <Col
          md={6}
          className="d-flex flex-column align-items-center justify-content-center"
        >
          <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
            Finest
            <span style={{ color: "#FFC107", fontWeight: "bold" }}>Mart</span>
          </Navbar.Brand>
          <img
            src="https://res.cloudinary.com/ds83mhjcm/image/upload/v1701948865/FinestMart/delivery-man_c4rwd4.png"
            alt="Delivery Man"
            className="img-fluid"
          />
        </Col>

        {/* Second Column */}
        <Col
          md={6}
          className="d-flex flex-column align-items-center justify-content-center"
        >
          <h2 className="mb-4">Sign Up</h2>
          {error && <p className="text-danger">{error}</p>}{" "}
          {/* Display error message */}
          <Form onSubmit={handleSubmit} className="w-75">
            <Form.Group controlId="formUsername" className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formEmail" className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="formPassword" className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              className="w-100 mb-3"
              disabled={loading}
            >
              {loading ? "Signing Up..." : "Sign Up"}
            </Button>
          </Form>
          <Button variant="outline-danger" className="w-100">
            Sign Up with Google
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUp;
