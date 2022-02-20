import React from "react";
import { Stack, Button } from "react-bootstrap";

const AuthButtons = () => {
  return (
    <Stack className="ms-auto" direction="horizontal" gap={2}>
      <Button variant="secondary">Login</Button>
      <Button variant="outline-secondary">Register</Button>
    </Stack>
  );
};

export default AuthButtons;
