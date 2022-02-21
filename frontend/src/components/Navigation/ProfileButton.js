import React, { useContext } from "react";
import { Button } from "react-bootstrap";
import { BsPersonCircle } from "react-icons/bs";
import { AuthContext } from "../../contexts/authContext";

const ProfileButton = () => {
  const { user } = useContext(AuthContext);

  return (
    <Button variant="outline-secondary" className="ms-auto">
      <BsPersonCircle className="me-3" />
      {user.name} {user.lastname}
    </Button>
  );
};

export default ProfileButton;
