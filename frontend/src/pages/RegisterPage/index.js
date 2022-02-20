import { useState } from "react";
import {
  Container,
  Form,
  FloatingLabel,
  Button,
  Row,
  Col,
  ButtonGroup,
  ToggleButton,
} from "react-bootstrap";

const RegisterPage = () => {
  const [radioValue, setRadioValue] = useState("student");
  const radios = [
    { name: "Student", value: "student" },
    { name: "Teacher", value: "teacher" },
  ];

  return (
    <Container>
      <div>
        <h1 className="text-center mt-5 mb-4">Register Page</h1>
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
            <div class="d-grid gap-2 mt-3">
              <ButtonGroup>
                {radios.map((radio, index) => (
                  <ToggleButton
                    key={index}
                    id={`radio-${index}`}
                    type="radio"
                    name="role"
                    value={radio.value}
                    checked={radioValue === radio.value}
                    onChange={(e) => setRadioValue(e.currentTarget.value)}
                    variant="outline-primary"
                    className="btn-sm me-3"
                  >
                    {radio.name}
                  </ToggleButton>
                ))}
              </ButtonGroup>
            </div>

            <div class="d-grid gap-2">
              <Button size="lg" className="mt-3" type="submit">
                Register
              </Button>
            </div>
          </Col>
        </Form>
      </Row>
    </Container>
  );
};

export default RegisterPage;
