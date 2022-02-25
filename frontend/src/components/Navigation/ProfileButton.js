import React, { useContext } from "react";
import { Button, Stack } from "react-bootstrap";
import { BsPersonCircle } from "react-icons/bs";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/authContext";

const ProfileButton = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <Stack className="ms-auto" direction="horizontal" gap={2}>
      <Button
        variant="outline-secondary"
        className="ms-auto btn-outline-primary"
      >
        <BsPersonCircle className="me-3" />
        {user.name} {user.lastname}
      </Button>
      <Button variant="secondary" onClick={handleLogout}>
        <RiLogoutCircleRLine />
      </Button>
    </Stack>
  );
};

export default ProfileButton;
