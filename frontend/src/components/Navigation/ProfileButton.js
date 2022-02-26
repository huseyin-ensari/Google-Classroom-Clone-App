import React, { useContext, useState } from "react";
import { Button, Stack } from "react-bootstrap";
import { BsPersonCircle } from "react-icons/bs";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { IoAddCircleSharp, IoSchoolSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/authContext";
import TeacherModel from "../MyModals/TeacherModel";

const ProfileButton = () => {
  const [modalShow, setModalShow] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <Stack className="ms-auto" direction="horizontal" gap={2}>
      {user.role === "student" ? (
        <>
          <Button variant="warning" size="sm">
            <IoAddCircleSharp className="me-2" />
            Enter the classroom
          </Button>
        </>
      ) : (
        <>
          <Button
            variant="warning"
            size="sm"
            onClick={() => setModalShow(true)}
          >
            <IoSchoolSharp className="me-2" />
            Create Classroom
          </Button>
          <TeacherModel show={modalShow} onHide={() => setModalShow(false)} />
        </>
      )}
      <Button
        variant="outline-secondary"
        className="ms-auto btn-outline-primary"
        size="sm"
      >
        <BsPersonCircle className="me-2" />
        {user.name} {user.lastname}
      </Button>
      <Button variant="secondary" onClick={handleLogout} size="sm">
        <RiLogoutCircleRLine />
      </Button>
    </Stack>
  );
};

export default ProfileButton;
