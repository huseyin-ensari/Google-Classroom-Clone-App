import React, { useContext } from "react";
import { Button, Form, Accordion } from "react-bootstrap";
import { useFormik } from "formik";
import { fetchCreateHomework } from "../../api/homeworkApi";
import { fetchClassroomDetail } from "../../api/classroomApi";
import { AuthContext } from "../../contexts/authContext";

const CreateHomework = () => {
  const { classroom, setClassroom } = useContext(AuthContext);

  const formik = useFormik({
    initialValues: {
      title: "",
      content: "",
      endTime: "",
    },
    onSubmit: async (values, bag) => {
      await fetchCreateHomework(classroom._id, values);

      const { data } = await fetchClassroomDetail(classroom._id);
      setClassroom({ ...data.data });
    },
  });

  return (
    <Accordion defaultActiveKey={0} className="mt-3">
      <Accordion.Item eventKey="0">
        <Accordion.Header>Create Post</Accordion.Header>
        <Accordion.Body>
          {/* Form */}
          <Form
            className="px-5"
            onSubmit={formik.handleSubmit}
            encType="multipart/form-data"
          >
            {/* Title */}
            <Form.Group className="mt-2">
              <Form.Label>Title</Form.Label>
              <Form.Control
                onChange={formik.handleChange}
                type="text"
                name="title"
              />
            </Form.Group>
            <Form.Group className="mt-2">
              <Form.Label>Content</Form.Label>
              <Form.Control
                onChange={formik.handleChange}
                type="text"
                name="content"
              />
            </Form.Group>
            <Form.Group className="mb-3 mt-2">
              <Form.Label>End Time</Form.Label>
              <Form.Control
                onChange={formik.handleChange}
                type="date"
                name="endTime"
              />
            </Form.Group>
            <div className="d-grid gap-2">
              <Button size="sm" type="submit">
                Send
              </Button>
            </div>
          </Form>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};

export default CreateHomework;
