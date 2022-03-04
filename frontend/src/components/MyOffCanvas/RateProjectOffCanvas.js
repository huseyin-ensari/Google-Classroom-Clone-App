import { Offcanvas, Button, Form } from "react-bootstrap";
import { useFormik } from "formik";
import { scoreValidation } from "../../helpers/inputValidation.js";
import { MdNoteAdd } from "react-icons/md";
import { fetchRateIt } from "../../api/homeworkApi";

const RateProjectOffCanvas = ({ name, lastname, projectID, show, setShow }) => {
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const formik = useFormik({
    initialValues: {
      score: 0,
    },
    validationSchema: scoreValidation,
    onSubmit: async (values) => {
      try {
        await fetchRateIt(projectID, values);
        setShow(false);
      } catch (e) {}
    },
  });

  return (
    <>
      <Button size="sm" onClick={handleShow}>
        <MdNoteAdd className="me-2" />
        Rate it
      </Button>

      <Offcanvas
        show={show}
        onHide={handleClose}
        className="w-75 h-75 mx-auto p-5"
        placement="top"
      >
        <Offcanvas.Header closeButton={true}>
          <Offcanvas.Title>
            {name} {lastname}
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="mt-2">
          <Form onSubmit={formik.handleSubmit}>
            <Form.Group>
              <Form.Label>Rate Project</Form.Label>
              <Form.Control
                type="number"
                onBlur={formik.onBlur}
                name="score"
                onChange={formik.handleChange}
                value={formik.values.score}
                isInvalid={formik.touched.score && formik.errors.score}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.score}
              </Form.Control.Feedback>
            </Form.Group>
            <div className="d-grid gap-2">
              <Button type="submit" className="mt-2">
                Rate
              </Button>
            </div>
          </Form>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default RateProjectOffCanvas;
