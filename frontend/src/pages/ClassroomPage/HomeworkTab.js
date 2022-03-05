import React, { useContext } from "react";
import { AuthContext } from "../../contexts/authContext";
import CreateHomework from "./CreateHomework";
import { Card, Row, Col, Button } from "react-bootstrap";
import { AiOutlineEnter, AiFillDelete } from "react-icons/ai";
import moment from "moment";
import SubmitHomeworkOffCanvas from "../../components/MyOffCanvas/SubmitHomeworkOffCanvas";
import { LinkContainer } from "react-router-bootstrap";
import { fetchDeleteHomework } from "../../api/homeworkApi";
import { fetchClassroomDetail } from "../../api/classroomApi";

const HomeworkTab = ({ homeworks }) => {
  const { user, classroom, setClassroom } = useContext(AuthContext);

  const deleteHomework = async (homeworkID) => {
    await fetchDeleteHomework(classroom._id, homeworkID);
    const { data } = await fetchClassroomDetail(classroom._id);
    setClassroom({ ...data.data });
  };

  return (
    <>
      {user.role === "teacher" && <CreateHomework />}
      {homeworks.length === 0 ? (
        <p className="fw-bold mt-2 text-center">There are no homework.</p>
      ) : (
        <>
          {homeworks
            .map((homework) => (
              <Card className="mt-2" key={homework._id}>
                <Card.Body>
                  <Card.Title>
                    <Row className="">
                      <Col>
                        <h5 className="d-inline me-3">{homework.title}</h5>
                      </Col>
                      {user.role === "teacher" && (
                        <Col className="text-end">
                          <Button
                            size="sm"
                            variant="warning"
                            onClick={() => deleteHomework(homework._id)}
                          >
                            <AiFillDelete />
                          </Button>
                        </Col>
                      )}
                    </Row>
                  </Card.Title>
                  <Card.Text>{homework.content}</Card.Text>
                </Card.Body>
                <Card.Footer className="text-muted">
                  <Row>
                    <Col>
                      {user.role === "student" ? (
                        <SubmitHomeworkOffCanvas homeworkID={homework._id} />
                      ) : (
                        <LinkContainer to={`/homework/${homework._id}`}>
                          <Button size="sm">
                            Detail <AiOutlineEnter />
                          </Button>
                        </LinkContainer>
                      )}
                    </Col>
                    <Col className="text-end">
                      THE LAST DAY{" "}
                      {moment(homework.endTime).format("DD.MM.YYYY")}
                    </Col>
                  </Row>
                </Card.Footer>
              </Card>
            ))
            .reverse()}
        </>
      )}
    </>
  );
};

export default HomeworkTab;
