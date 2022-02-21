import React from "react";
import { Button } from "react-bootstrap";
import { BsPersonCircle } from "react-icons/bs";

const ProfileButton = ({ name, lastname }) => {
  return (
    <Button variant="outline-secondary" className="ms-auto">
      <BsPersonCircle className="me-3" /> {name} {lastname}
    </Button>
  );
};

export default ProfileButton;
