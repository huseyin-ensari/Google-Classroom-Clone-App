import React from "react";
import { Stack, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const AuthButtons = () => {
  return (
    <Stack className="ms-auto" direction="horizontal" gap={2}>
      <LinkContainer to="/login">
        <Button variant="secondary">Login</Button>
      </LinkContainer>
      <LinkContainer to="/register">
        <Button variant="outline-secondary">Register</Button>
      </LinkContainer>
    </Stack>
  );
};

export default AuthButtons;
