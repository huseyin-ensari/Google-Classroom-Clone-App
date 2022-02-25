import { useFormik } from "formik";
import React, { useContext } from "react";
import {
  Container,
  Form,
  FloatingLabel,
  Button,
  Row,
  Col,
  Alert,
} from "react-bootstrap";
import { loginInputValidation } from "../../helpers/inputValidation.js";
import { fetchLogin } from "../../api/authApi";
import { AuthContext } from "../../contexts/authContext";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginInputValidation,
    onSubmit: async (values, bag) => {
      try {
        const response = await fetchLogin(values);
        login(response);
        navigate("/");
      } catch (err) {
        bag.setErrors({ general: err.response?.data.message });
      }
    },
  });

  return (
    <Container>
      <div>
        <h1 className="text-center mt-5 mb-4">Login Page</h1>
      </div>
      {/* forms */}
      <Row>
        {formik.errors.general && (
          <Col md={{ span: 6, offset: 3 }}>
            <Alert variant="danger">{formik.errors.general}</Alert>
          </Col>
        )}
        <Form onSubmit={formik.handleSubmit}>
          <Col md={{ span: 6, offset: 3 }}>
            <FloatingLabel
              controlId="floatingInput"
              label="Email address"
              className="mb-3"
            >
              <Form.Control
                onChange={formik.handleChange}
                onBlur={formik.onBlur}
                value={formik.values.email}
                name="email"
                type="email"
                placeholder="name@example.com"
                isInvalid={formik.touched.email && formik.errors.email}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.email}
              </Form.Control.Feedback>
            </FloatingLabel>

            <FloatingLabel controlId="floatingPassword" label="Password">
              <Form.Control
                name="password"
                onChange={formik.handleChange}
                onBlur={formik.onBlur}
                value={formik.values.password}
                type="password"
                placeholder="Password"
                isInvalid={formik.touched.password && formik.errors.password}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.password}
              </Form.Control.Feedback>
            </FloatingLabel>
            <div className="d-grid gap-2">
              <Button size="lg" className="mt-3" type="submit">
                Login
              </Button>
            </div>
          </Col>
        </Form>
      </Row>
    </Container>
  );
};

export default LoginPage;
