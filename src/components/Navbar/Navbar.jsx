import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import CartWidget from "../CartWidget/CartWidget";
import logo from "/img/logo.png";
import Slider from "../Slider/Slider";
import { Link } from "react-router-dom";
import "./navbar.scss";

const NavBar = () => {
  return (
    <>
      <Navbar expand="lg" className="barra">
        <Container>
          <Navbar.Brand as={Link} to="/">
            {<img src={logo} alt="" className="logo" />}
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">
                Inicio
              </Nav.Link>
              <Nav.Link as={Link} to="/envios">
                Envíos
              </Nav.Link>
              <NavDropdown title="Smartphones" id="basic-nav-dropdown">
                <NavDropdown.Item as={Link} to="/category/Motorola">
                  Motorola
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/category/Samsung">
                  Samsung
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/category/TCL">
                  TCL
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/category/Xiaomi">
                  Xiaomi
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/category/ZTE">
                  ZTE
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item as={Link} to="/">
                  Ofertas
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
          <CartWidget />
        </Container>
      </Navbar>
      <Slider />
    </>
  );
};

export default NavBar;
