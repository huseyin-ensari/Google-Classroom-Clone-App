import React from "react";
import { Badge, Col, Container, Row, Spinner } from "react-bootstrap";

const ClassroomHeader = ({ classroom }) => {
  return (
    <Row className="mt-4">
      <Col>
        <h1>{classroom.title}</h1>
      </Col>
      <Col className="text-end">
        <span className="d-block">
          Teacher : {classroom?.teacher.name} {classroom?.teacher.lastname}
        </span>
        <span className="d-block">
          Access Code : <Badge>{classroom.accessCode}</Badge>
        </span>
      </Col>
      <hr className="bg-primary" />
    </Row>
  );
};

export default ClassroomHeader;
