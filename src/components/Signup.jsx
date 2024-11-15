import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Row, Col, Button, Form, Navbar } from "react-bootstrap";
import {
  auth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "../firebaseConfig"; // Import Firebase
import { FaGoogle } from "react-icons/fa"; // Google icon
import Swal from "sweetalert2"; // For alerts

const SignUp = ({ onSignUpSuccess }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState(""); // For error handling
  const [loading, setLoading] = useState(false); // For loading state
  const navigate = useNavigate(); // Hook for navigation

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { email, password, username } = formData;

    try {
      // Firebase email/password sign-up
      await createUserWithEmailAndPassword(auth, email, password);
      console.log("User signed up successfully!");

      // Store user data in localStorage
      localStorage.setItem("user", JSON.stringify({ username, email }));

      // Notify parent component (update login state)
      onSignUpSuccess(username);

      // Success alert
      Swal.fire({
        icon: "success",
        title: "Welcome!",
        text: "Your account has been created successfully!",
      });

      // Navigate to Dashboard
      navigate("/dashboard");
    } catch (error) {
      setError(error.message);
      console.error("Error signing up:", error.message);

      // Show error alert
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    const provider = new GoogleAuthProvider();

    try {
      // Sign in with Google
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      console.log("Google sign-in successful!", user);

      // Store user data in localStorage
      localStorage.setItem(
        "user",
        JSON.stringify({ username: user.displayName, email: user.email })
      );

      // Notify parent component
      onSignUpSuccess(user.displayName);

      // Success alert
      Swal.fire({
        icon: "success",
        title: "Welcome!",
        text: "You have signed up with Google successfully!",
      });

      // Redirect to Dashboard
      navigate("/dashboard");
    } catch (error) {
      console.error("Google sign-in error:", error.message);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message,
      });
    }
  };

  return (
    <Container className="signup-container">
      <Row>
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

        <Col
          md={6}
          className="d-flex flex-column align-items-center justify-content-center"
        >
          <h2 className="mb-4">Sign Up</h2>
          {error && <p className="text-danger">{error}</p>}
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

          {/* Fieldset with "or" text */}
          <fieldset className="w-100 mb-3">
            <legend className="text-center">or</legend>
          </fieldset>

          {/* Google Sign Up Button */}
          <Button
            variant="outline-danger"
            className="w-100 d-flex justify-content-center align-items-center"
            onClick={handleGoogleSignUp}
          >
            <FaGoogle className="me-2" />
            Sign Up with Google
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUp;
