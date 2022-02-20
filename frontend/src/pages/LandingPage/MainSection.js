import React from "react";
import { Button, Col, Container, Image, Row } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { mainSvg } from "./assets";

const MainSection = () => {
  return (
    <section className="bg-light p-5">
      <Container>
        <Row className="justify-content-center align-items-center">
          <Col className="text-center me-5">
            <h2 className="mb-4">
              The platform where everything related to education and learning
              comes together
            </h2>
            <p className="lead">
              <span className="text-primary fw-bold">Classroom</span> is a
              one-stop shop for all things education and learning. With our
              easy-to-use and secure tool, instructors manage, measure and
              enrich their learning experience.
            </p>
            <LinkContainer to="/register">
              <Button>Join Us</Button>
            </LinkContainer>
          </Col>
          <Col>
            <Image fluid src={mainSvg} alt="Online Education | Classroom App" />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default MainSection;
