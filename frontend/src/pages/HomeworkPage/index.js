import moment from "moment";
import React, { useEffect, useState } from "react";
import { Badge, Col, Container, Row, Table } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { fetchHomeworkDetail } from "../../api/homeworkApi";

const HomeworkPage = () => {
  const { homeworkID } = useParams();
  const [homework, setHomework] = useState({});

  useEffect(() => {
    const getHomeworkDetail = async () => {
      const { data } = await fetchHomeworkDetail(homeworkID);
      console.log("homework -> ", data.homework);
      setHomework({ ...data.homework });
    };
    getHomeworkDetail();
  }, [homeworkID]);

  return (
    <Container className="mt-4">
      {/* header */}
      <Row>
        <Col>
          <h1>{homework.title}</h1>
        </Col>
        <Col className="text-end">
          THE LAST DAY : {moment(homework.endTime).format("DD.MM.YYYY")}
          <br />
          {/* Teacher : {homework.teacher.name} {homework.teacher.lastname} */}
        </Col>
      </Row>
      <hr className="bg-primary" />
      {/* body */}
      <p className="lead">{homework.content}sss</p>

      {homework?.submitters?.length > 0 && (
        <>
          <p className="text-center text-uppercase border border-success border-2">
            Those who do their homework
          </p>
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>Name</th>
                <th>Lastname</th>
                <th>'s Project</th>
                <th>Score</th>
                <th>Rate it</th>
              </tr>
            </thead>
            <tbody>
              {homework?.submitters?.map((submitter) => (
                <tr key={submitter._id}>
                  <td>{submitter.user.name}</td>
                  <td>{submitter.user.lastname}</td>
                  <td>Download</td>
                  <td>-</td>
                  <td>Button</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
      {homework?.appointedStudents?.length > 0 &&
        homework?.appointedStudents?.map((student) => (
          <>
            <p className="text-center text-uppercase border border-warning border-2 ">
              Those who do not do their homework
            </p>

            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Lastname</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>{student.name}</th>
                  <th>{student.lastname}</th>
                </tr>
              </tbody>
            </Table>
          </>
        ))}
    </Container>
  );
};

export default HomeworkPage;
