import React from "react";
import {
  giveNote,
  lectureNotes,
  shareYourHomework,
  downloadExcel,
} from "./assets";
import MyCard from "./Card";
import { Container, Row } from "react-bootstrap";

const CardsSection = () => {
  return (
    <Container className="p-5">
      <Row className="justify-content-between g-4" xs={2} md={3} sm={2}>
        <MyCard
          img={lectureNotes}
          title="Share Lecture Notes"
          text="Lorem, ipsum dolor sit amet consectetur adipisicing elit."
        />
        <MyCard
          img={shareYourHomework}
          title="Share Homework"
          text="Lorem, ipsum dolor sit amet consectetur adipisicing elit."
        />
        <MyCard
          img={giveNote}
          title="Rate Project"
          text="Lorem, ipsum dolor sit amet consectetur adipisicing elit."
        />
        <MyCard
          img={downloadExcel}
          title="Output As Excel Document"
          text="Lorem, ipsum dolor sit amet consectetur adipisicing elit."
        />
      </Row>
    </Container>
  );
};

export default CardsSection;
