import React, { useState, useEffect } from "react";
import { useCart } from "./CartContext"; // Assuming useCart provides cartCount
import { Navbar, Nav, Button, Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingBag,
  faBars,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom"; // Import Link and useNavigate for routing
import { getAuth, onAuthStateChanged } from "firebase/auth"; // Import Firebase Auth functions
import "../css/navbar.css"; // Custom CSS for styling

const FinestMartNavbar = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState(""); // Store the username
  const { cartCount } = useCart(); // Get cartCount from context
  const navigate = useNavigate(); // Hook to navigate programmatically

  useEffect(() => {
    const auth = getAuth();
    // Check if the user is logged in when the component mounts
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
        setUsername(user.displayName || "User"); // Set username (displayName in Firebase Auth)
      } else {
        setIsLoggedIn(false);
      }
    });
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    const auth = getAuth();
    auth.signOut().then(() => {
      setIsLoggedIn(false);
      navigate("/"); // Redirect to home after logging out
    });
  };

  return (
    <header>
      {/* Mobile Navbar */}
      <Navbar expand="lg" bg="light" variant="light" className="py-3 d-lg-none">
        <Container>
          <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
            Finest<span style={{ color: "#FFC107" }}>Mart</span>
          </Navbar.Brand>
          <div className="d-flex align-items-center">
            <Link to="/cart" className="cart-icon">
              <FontAwesomeIcon icon={faShoppingBag} />
              {cartCount > 0 && (
                <sup
                  style={{
                    color: "#fff",
                    backgroundColor: "red",
                    padding: "2px 5px",
                    borderRadius: "50%",
                    fontSize: "9px",
                  }}
                >
                  {cartCount}
                </sup>
              )}
            </Link>
            <Navbar.Toggle onClick={toggleMenu} className="border-0">
              <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} />
            </Navbar.Toggle>
          </div>
        </Container>
      </Navbar>

      {/* Menu Overlay for mobile */}
      <div className={`overlay ${isMenuOpen ? "overlay-open" : ""}`}>
        <div className="overlay-content">
          <FontAwesomeIcon
            icon={isMenuOpen ? faTimes : faBars}
            onClick={toggleMenu}
            className="overlay-toggle"
          />
          <Nav className="flex-column text-center">
            <Nav.Link as={Link} to="/" className="py-3">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/" className="py-3">
              Categories
            </Nav.Link>
            <Nav.Link as={Link} to="/" className="py-3">
              Sales
            </Nav.Link>
            <Nav.Link as={Link} to="/" className="py-3">
              FAQs
            </Nav.Link>
            <Nav.Link as={Link} to="/" className="py-3">
              About
            </Nav.Link>
            <Nav.Link as={Link} to="/" className="py-3">
              Contact
            </Nav.Link>
            {!isLoggedIn ? (
              <div className="d-flex justify-content-center py-3">
                <Button variant="outline-danger" className="me-2">
                  Sign In
                </Button>
                <Button variant="danger" as={Link} to="/signup">
                  Sign Up
                </Button>
              </div>
            ) : (
              <Button variant="outline-danger" onClick={handleLogout}>
                Log Out
              </Button>
            )}
          </Nav>
        </div>
      </div>

      {/* Full Navbar for desktop screens (hidden on mobile) */}
      <Navbar
        expand="lg"
        bg="light"
        variant="light"
        className="py-3 d-none d-lg-block"
      >
        <Container>
          <Navbar.Brand as={Link} to="/">
            Finest<span style={{ color: "#FFC107" }}>Mart</span>
          </Navbar.Brand>
          <Nav className="m-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/">
              Categories
            </Nav.Link>
            <Nav.Link as={Link} to="/">
              Sales
            </Nav.Link>
            <Nav.Link as={Link} to="/">
              FAQs
            </Nav.Link>
            <Nav.Link as={Link} to="/">
              About
            </Nav.Link>
            <Nav.Link as={Link} to="/">
              Contact
            </Nav.Link>
          </Nav>
          {!isLoggedIn ? (
            <>
              <Button variant="outline-danger" className="me-2">
                Sign In
              </Button>
              <Button variant="danger" as={Link} to="/signup">
                Sign Up
              </Button>
            </>
          ) : (
            <Link to="/dashboard">
              <Button variant="outline-success" className="me-2">
                Logout
              </Button>
            </Link>
          )}
          {isLoggedIn && (
            <span className="ms-3" style={{ fontWeight: "bold" }}>
              Hello, {username}
            </span>
          )}
          <Nav.Link as={Link} to="/cart" className="ms-3">
            <div className="cart-icon">
              <FontAwesomeIcon icon={faShoppingBag} />
              {cartCount > 0 && (
                <sup
                  style={{
                    color: "#fff",
                    backgroundColor: "red",
                    padding: "2px 5px",
                    borderRadius: "50%",
                    fontSize: "9px",
                  }}
                >
                  {cartCount}
                </sup>
              )}
            </div>
          </Nav.Link>
        </Container>
      </Navbar>
    </header>
  );
};

export default FinestMartNavbar;
