import { useFormik } from "formik";
import { Form, Modal, FloatingLabel, Button, Alert } from "react-bootstrap";
import { fetchJoinClassroom } from "../../api/classroomApi";

const StudentModal = (props) => {
  const formik = useFormik({
    initialValues: {
      classroomCode: "",
    },
    onSubmit: async (values, bag) => {
      try {
        const result = await fetchJoinClassroom(values.classroomCode);
        if (result.status === 200) props.onHide();
        values.classroomCode = "";
      } catch (e) {
        bag.setErrors({ general: e.response?.data.message });
      }
    },
  });

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Join Classroom
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {formik.errors.general && (
          <Alert variant="danger">{formik.errors.general}</Alert>
        )}
        {/* form */}
        <Form>
          <FloatingLabel
            controlId="floatingTitle"
            label="Classroom Code"
            className="mb-3"
          >
            <Form.Control
              onChange={formik.handleChange}
              onBlur={formik.onBlur}
              value={formik.values.classroomCode.toUpperCase()}
              name="classroomCode"
              type="text"
              isInvalid={
                formik.touched.classroomCode && formik.errors.classroomCode
              }
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.classroomCode}
            </Form.Control.Feedback>
          </FloatingLabel>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-primary" onClick={formik.handleSubmit}>
          Join
        </Button>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default StudentModal;
