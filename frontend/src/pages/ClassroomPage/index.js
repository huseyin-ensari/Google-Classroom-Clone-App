import React, { useContext, useEffect } from "react";
import { Container, Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { fetchClassroomDetail } from "../../api/classroomApi";
import { AuthContext } from "../../contexts/authContext";
import ClassroomBody from "./ClassroomBody";
import ClassroomHeader from "./ClassroomHeader";

const ClassroomPage = () => {
  const { classroomID } = useParams();
  const { classroom, setClassroom } = useContext(AuthContext);

  useEffect(() => {
    const getClassroomDetail = async (id) => {
      const { data } = await fetchClassroomDetail(id);
      setClassroom({ ...data.data });
    };
    getClassroomDetail(classroomID);
  }, [classroomID, setClassroom]);

  if (!classroom) {
    return <Spinner />;
  }

  return (
    <Container>
      <ClassroomHeader classroom={classroom} />
      <ClassroomBody classroom={classroom} />
    </Container>
  );
};

export default ClassroomPage;
