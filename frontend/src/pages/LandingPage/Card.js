import React from "react";
import { Card, Image } from "react-bootstrap";

const MyCard = ({ title, text, img }) => {
  return (
    <Card
      className="border-primary border-2 text-center shadow-lg bg-light p-3"
      style={{ width: "15rem" }}
    >
      <Image className="mt-auto" src={img} alt={title} />
      <div className="mt-auto">
        <Card.Body>
          <Card.Title className="fw-bold">{title}</Card.Title>
          <Card.Text>{text}</Card.Text>
        </Card.Body>
      </div>
    </Card>
  );
};

export default MyCard;
