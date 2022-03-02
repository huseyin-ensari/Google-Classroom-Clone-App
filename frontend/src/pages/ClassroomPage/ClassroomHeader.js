import React, { useContext } from "react";
import { Badge, Col, Row } from "react-bootstrap";
import { EditClassroomInformation } from "../../components/MyOffCanvas";
import { AuthContext } from "../../contexts/authContext";

const ClassroomHeader = ({ classroom }) => {
  const { user } = useContext(AuthContext);

  return (
    <Row className="mt-4">
      <Col>
        <h1>
          {classroom.title}{" "}
          {user.role === "teacher" && (
            <EditClassroomInformation classroom={classroom} />
          )}
        </h1>
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
