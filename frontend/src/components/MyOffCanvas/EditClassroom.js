import { useContext, useState } from "react";
import { Offcanvas, Button, Form } from "react-bootstrap";
import { useFormik } from "formik";
import { AiFillEdit } from "react-icons/ai";
import { updateClassroomValidation } from "../../helpers/inputValidation.js";
import { fetchUpdateClassroomInformation } from "../../api/classroomApi.js";
import { AuthContext } from "../../contexts/authContext";

const EditClassroom = ({ classroom }) => {
  const [show, setShow] = useState(false);
  const { setClassroom } = useContext(AuthContext);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const formik = useFormik({
    initialValues: {
      title: "",
    },
    validationSchema: updateClassroomValidation,
    onSubmit: async (values) => {
      setShow(false);
      const { data } = await fetchUpdateClassroomInformation(
        classroom._id,
        values
      );
      setClassroom({ ...classroom, title: data.classroom.title });
    },
  });

  return (
    <>
      <Button size="sm" onClick={handleShow}>
        <AiFillEdit />
      </Button>

      <Offcanvas
        show={show}
        onHide={handleClose}
        className="w-75 h-75 mx-auto p-5"
        placement="top"
      >
        <Offcanvas.Header closeButton={true}>
          <Offcanvas.Title>Edit Classroom Title</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="mt-2">
          <Form onSubmit={formik.handleSubmit}>
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control
                onBlur={formik.onBlur}
                name="title"
                onChange={formik.handleChange}
                value={formik.values.title}
                isInvalid={formik.touched.title && formik.errors.title}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.title}
              </Form.Control.Feedback>
            </Form.Group>
            <div className="d-grid gap-2">
              <Button type="submit" className="mt-2">
                Update
              </Button>
            </div>
          </Form>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default EditClassroom;
