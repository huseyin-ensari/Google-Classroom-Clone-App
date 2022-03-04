import React from "react";
import { Card, Col, Image } from "react-bootstrap";

const MyCard = ({ title, text, img }) => {
  return (
    <Col>
      <Card
        // style={{ height: "25rem" }}
        className="border-primary border-2 text-center shadow-lg bg-light p-3 h-100"
      >
        <Image className="mt-auto" src={img} alt={title} />
        <div className="mt-auto">
          <Card.Body>
            <Card.Title className="fw-bold">{title}</Card.Title>
            <Card.Text>{text}</Card.Text>
          </Card.Body>
        </div>
      </Card>
    </Col>
  );
};

export default MyCard;
