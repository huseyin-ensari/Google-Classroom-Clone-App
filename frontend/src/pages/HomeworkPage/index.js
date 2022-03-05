import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Container, Row, Spinner, Table } from "react-bootstrap";
import { useParams } from "react-router-dom";
import {
  fetchDownloadExcelFile,
  fetchDownloadHomeworkFile,
  fetchHomeworkDetail,
} from "../../api/homeworkApi";
import { FaDownload } from "react-icons/fa";
import { SiMicrosoftexcel } from "react-icons/si";
import { saveAs } from "file-saver";
import RateProjectOffCanvas from "../../components/MyOffCanvas/RateProjectOffCanvas";
import { AuthContext } from "../../contexts/authContext";

const HomeworkPage = () => {
  const { homeworkID } = useParams();
  const [homework, setHomework] = useState({});
  const [show, setShow] = useState(false);
  const [lock, setLock] = useState(false);
  const { classroom } = useContext(AuthContext);

  useEffect(() => {
    const getHomeworkDetail = async () => {
      const { data } = await fetchHomeworkDetail(homeworkID);
      setHomework({ ...data.homework });
    };
    getHomeworkDetail();
  }, [homeworkID, show]);

  const downloadFile = async (filename) => {
    saveAs(fetchDownloadHomeworkFile(filename), "Project");
  };

  const downloadExcelFile = async (homeworkID) => {
    setLock(true);
    saveAs(fetchDownloadExcelFile(classroom._id, homeworkID), "StudentGrades");
    setTimeout(() => {
      setLock(false);
    }, 500);
  };

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
          <Button
            size="sm"
            variant="success"
            onClick={() => downloadExcelFile(homeworkID)}
            disabled={lock}
          >
            {lock ? (
              <>
                <Spinner
                  as="span"
                  animation="grow"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                  className="me-2"
                />
                Loading...
              </>
            ) : (
              <>
                <SiMicrosoftexcel className="me-2" /> Download student grades
              </>
            )}
          </Button>
        </Col>
      </Row>
      <hr className="bg-primary" />
      {/* body */}
      <p className="lead">{homework.content}</p>

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
                  <td>
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => downloadFile(submitter?.file)}
                    >
                      <FaDownload className="me-2" />
                      Download
                    </Button>
                  </td>
                  <td>{submitter.score ? submitter.score : "-"}</td>
                  <td>
                    <RateProjectOffCanvas
                      name={submitter.user.name}
                      lastname={submitter.user.lastname}
                      projectID={submitter._id}
                      show={show}
                      setShow={setShow}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
      {homework?.appointedStudents?.length > 0 && (
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
              {homework?.appointedStudents?.map((student) => (
                <tr key={student._id}>
                  <td>{student.name}</td>
                  <td>{student.lastname}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </Container>
  );
};

export default HomeworkPage;
