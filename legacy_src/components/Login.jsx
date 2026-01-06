import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import Swal from "sweetalert2";
import { auth, signInWithEmailAndPassword } from "../firebaseConfig"; // Import Firebase auth functions

const Login = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Use Firebase authentication to sign in
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // If login is successful, show success message with SweetAlert
      Swal.fire({
        title: "Login Successful!",
        text: "You are now logged in.",
        icon: "success",
        confirmButtonText: "Go to Dashboard",
      }).then(() => {
        onLoginSuccess(user.email); // Pass user email to onLoginSuccess
        navigate("/dashboard"); // Redirect to Dashboard
      });
    } catch (error) {
      // Handle Firebase authentication errors
      Swal.fire({
        title: "Error",
        text: "Invalid email or password.",
        icon: "error",
        confirmButtonText: "Try Again",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Row className="login-form">
      <Col md={6} className="d-flex justify-content-center align-items-center">
        <img
          src="https://res.cloudinary.com/ds83mhjcm/image/upload/v1731495121/FinestMart/login_gxcue8.png"
          alt="Login Illustration"
          className="img-fluid"
        />
      </Col>

      <Col md={6} className="p-5">
        <h2>Login</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="email">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>

          <Button
            variant="primary"
            type="submit"
            disabled={loading}
            className="mt-3"
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
        </Form>
      </Col>
    </Row>
  );
};

export default Login;
