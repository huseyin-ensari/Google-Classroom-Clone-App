import React from "react";
import {
  Container,
  Form,
  FloatingLabel,
  Button,
  Row,
  Col,
} from "react-bootstrap";

const LoginPage = () => {
  return (
    <Container>
      <div>
        <h1 className="text-center mt-5 mb-4">Login Page</h1>
      </div>
      {/* forms */}
      <Row>
        <Form className="">
          <Col md={{ span: 6, offset: 3 }}>
            <FloatingLabel
              controlId="floatingInput"
              label="Email address"
              className="mb-3"
            >
              <Form.Control type="email" placeholder="name@example.com" />
            </FloatingLabel>
          </Col>
          <Col md={{ span: 6, offset: 3 }}>
            <FloatingLabel controlId="floatingPassword" label="Password">
              <Form.Control type="password" placeholder="Password" />
            </FloatingLabel>
            <div class="d-grid gap-2">
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
