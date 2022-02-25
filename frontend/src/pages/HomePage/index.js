import React, { useContext } from "react";
import { Container } from "react-bootstrap";
import { AuthContext } from "../../contexts/authContext";
import NoClassroom from "./NoClassroom";

const HomePage = () => {
  const { classrooms } = useContext(AuthContext);
  return (
    <Container className="mt-5">
      {classrooms.length === 0 && <NoClassroom />}
    </Container>
  );
};

export default HomePage;
