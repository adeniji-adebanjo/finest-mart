import React, { useState } from "react";
import { Navbar, Nav, Button, Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingBag,
  faBars,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import "../css/navbar.css"; // Custom CSS for styling

const FinestMartNavbar = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <header>
      {/* Mobile Navbar */}
      <Navbar expand="lg" bg="light" variant="light" className="py-3 d-lg-none">
        <Container>
          <Navbar.Brand href="/" className="d-flex align-items-center">
            Finest<span style={{ color: "#FFC107" }}>Mart</span>
          </Navbar.Brand>
          <div className="d-flex align-items-center">
            <FontAwesomeIcon icon={faShoppingBag} className="me-5" />
            <Navbar.Toggle onClick={toggleMenu} className="border-0">
              <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} />
            </Navbar.Toggle>
          </div>
        </Container>
      </Navbar>

      {/* Menu Overlay for mobile */}
      <div className={`overlay ${isMenuOpen ? "overlay-open" : ""}`}>
        <div className="overlay-content">
          {/* Hamburger or cancel icon (visible in overlay) */}
          <FontAwesomeIcon
            icon={isMenuOpen ? faTimes : faBars}
            onClick={toggleMenu}
            className="overlay-toggle"
          />
          <Nav className="flex-column text-center">
            <Nav.Link href="/" className="py-3">
              Home
            </Nav.Link>
            <Nav.Link href="/" className="py-3">
              Categories
            </Nav.Link>
            <Nav.Link href="/" className="py-3">
              Sales
            </Nav.Link>
            <Nav.Link href="/" className="py-3">
              FAQs
            </Nav.Link>
            <Nav.Link href="/" className="py-3">
              About
            </Nav.Link>
            <Nav.Link href="/" className="py-3">
              Contact
            </Nav.Link>
            <div className="d-flex justify-content-center py-3">
              <Button variant="outline-danger" className="me-2">
                Sign In
              </Button>
              <Button variant="danger">Sign Up</Button>
            </div>
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
          <Navbar.Brand href="#">
            Finest<span style={{ color: "#FFC107" }}>Mart</span>
          </Navbar.Brand>
          <Nav className="m-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/">Categories</Nav.Link>
            <Nav.Link href="/">Sales</Nav.Link>
            <Nav.Link href="/">FAQs</Nav.Link>
            <Nav.Link href="/">About</Nav.Link>
            <Nav.Link href="/">Contact</Nav.Link>
          </Nav>
          <Button variant="outline-danger" className="me-2">
            Sign In
          </Button>
          <Button variant="danger">Sign Up</Button>
          <Nav.Link href="#" className="ms-3">
            <FontAwesomeIcon icon={faShoppingBag} />
          </Nav.Link>
        </Container>
      </Navbar>
    </header>
  );
};

export default FinestMartNavbar;
