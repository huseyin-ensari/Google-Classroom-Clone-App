import React, { useContext, useEffect } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/authContext";
import NoClassroom from "./NoClassroom";
import classroomSVG from "./assets/classroom.svg";

const HomePage = () => {
  const { classrooms, user } = useContext(AuthContext);
  useEffect(() => {}, [classrooms]);

  return (
    <Container className="mt-5">
      {classrooms.length === 0 ? (
        <NoClassroom />
      ) : (
        <Row xs={1} md={2} lg={4} className="g-3">
          {classrooms.map((classroom) => (
            <Col key={classroom._id}>
              <Link
                to={`/classroom/${classroom._id}`}
                className="text-decoration-none text-dark"
              >
                <Card border={user.role === "teacher" ? "warning" : "primary"}>
                  <Card.Img variant="top" src={classroomSVG} className="p-4" />
                  <Card.Body>
                    <Card.Title>{classroom.title}</Card.Title>
                    <Card.Text>{classroom.subtitle}</Card.Text>
                  </Card.Body>
                  <Card.Footer className="text-end fst-italic">
                    {classroom.teacher.name.toUpperCase()}{" "}
                    {classroom.teacher.lastname.toUpperCase()}
                  </Card.Footer>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default HomePage;
