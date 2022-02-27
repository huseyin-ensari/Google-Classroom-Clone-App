import React, { useEffect, useState } from "react";
import { Container, Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { fetchClassroomDetail } from "../../api/classroomApi";
import ClassroomBody from "./ClassroomBody";
import ClassroomHeader from "./ClassroomHeader";

const ClassroomPage = () => {
  const { classroomID } = useParams();
  const [classroom, setClassroom] = useState(null);

  useEffect(() => {
    const getClassroomDetail = async (id) => {
      const { data } = await fetchClassroomDetail(id);
      console.log("Gelen veri -> ", data.data);
      setClassroom({ ...data.data });
    };
    getClassroomDetail(classroomID);
  }, [classroomID]);
  console.log("classroom stati -> ", classroom);

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
