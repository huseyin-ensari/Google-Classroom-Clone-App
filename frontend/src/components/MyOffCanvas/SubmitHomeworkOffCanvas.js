import { useState } from "react";
import { Offcanvas, Button, Form, Alert, Toast } from "react-bootstrap";
import { useFormik } from "formik";
import { BsFillCapslockFill } from "react-icons/bs";
import { fetchSubmitHomework } from "../../api/homeworkApi";

const SubmitHomeworkOffCanvas = ({ homeworkID }) => {
  const formData = new FormData();

  const [show, setShow] = useState(false);
  const [toastShow, setToastShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const formik = useFormik({
    initialValues: {
      homework: null,
    },
    onSubmit: async (values, bag) => {
      try {
        formData.append("homework", values.homework);
        await fetchSubmitHomework(homeworkID, formData);
        setShow(false);
        setToastShow(true);
      } catch (e) {
        bag.setErrors({ general: e.response?.data.message });
      }
    },
  });

  const handleChangeFile = (e) => {
    formik.setFieldValue("homework", e.target.files[0]);
  };

  return (
    <>
      <Button size="sm" onClick={handleShow}>
        <BsFillCapslockFill className="me-3" />
        Submit Homework
      </Button>

      <Offcanvas
        show={show}
        onHide={handleClose}
        className="w-75 h-75 mx-auto p-5"
        placement="top"
      >
        <Offcanvas.Header closeButton={true}>
          <Offcanvas.Title>Homework Upload</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="mt-2">
          {formik.errors.general && (
            <Alert variant="danger">{formik.errors.general}</Alert>
          )}
          <Form onSubmit={formik.handleSubmit} encType="multipart/form-data">
            <Form.Group controlId="homework" className="mb-3 mt-2">
              <Form.Label>File Upload</Form.Label>
              <Form.Control
                onChange={handleChangeFile}
                type="file"
                name="homework"
                aria-label="Upload"
              />
            </Form.Group>
            <div className="d-grid gap-2">
              <Button type="submit" className="mt-2">
                Upload
              </Button>
            </div>
          </Form>
        </Offcanvas.Body>
      </Offcanvas>
      <Toast
        onClose={() => setToastShow(false)}
        show={toastShow}
        delay={2000}
        autohide
      >
        <Toast.Header>
          <strong className="me-auto text-success">Successful</strong>
        </Toast.Header>
        <Toast.Body>Homework sent</Toast.Body>
      </Toast>
    </>
  );
};

export default SubmitHomeworkOffCanvas;
