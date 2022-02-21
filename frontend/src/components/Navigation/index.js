import React, { useContext } from "react";
import { Navbar, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { AuthContext } from "../../contexts/authContext";
import AuthButtons from "./AuthButtons";
import ProfileButton from "./ProfileButton";

const Navigation = () => {
  const { isLoggin, user } = useContext(AuthContext);

  return (
    <Navbar bg="primary" variant="dark" expand="lg" collapseOnSelect>
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand href="#home" className="fw-bold">
            Classroom
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {!isLoggin && <AuthButtons />}
          {isLoggin && (
            <ProfileButton name={user.name} lastname={user.lastname} />
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
