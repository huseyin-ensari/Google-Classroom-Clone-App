import React, { useContext, useState } from "react";
import { AuthContext } from "../../contexts/authContext";
import CreateHomework from "./CreateHomework";
import { Card, Row, Col } from "react-bootstrap";
import moment from "moment";
import SubmitHomeworkOffCanvas from "../../components/MyOffCanvas/SubmitHomeworkOffCanvas";

const HomeworkTab = ({ homeworks }) => {
  const { user } = useContext(AuthContext);

  return (
    <>
      {user.role === "teacher" && <CreateHomework />}
      {homeworks.length === 0 ? (
        <p className="fw-bold mt-2 text-center">There are no homework.</p>
      ) : (
        <>
          {homeworks.reverse().map((homework) => (
            <Card className="mt-2" key={homework._id}>
              <Card.Body>
                <Card.Title>
                  <h5 className="d-inline me-3">{homework.title}</h5>
                </Card.Title>
                <Card.Text>{homework.content}</Card.Text>
              </Card.Body>
              <Card.Footer className="text-muted">
                <Row>
                  <Col>
                    <SubmitHomeworkOffCanvas homeworkID={homework._id} />
                  </Col>
                  <Col className="text-end">
                    THE LAST DAY {moment(homework.endTime).format("DD.MM.YYYY")}
                  </Col>
                </Row>
              </Card.Footer>
            </Card>
          ))}
        </>
      )}
    </>
  );
};

export default HomeworkTab;
