import React from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import AuthButtons from "./AuthButtons";

const Navigation = () => {
  return (
    <Navbar bg="primary" variant="dark" expand="lg" collapseOnSelect>
      <Container>
        <Navbar.Brand href="#home" className="fw-bold">
          Classroom
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <AuthButtons />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
