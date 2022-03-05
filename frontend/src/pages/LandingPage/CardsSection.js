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
    <Container className="p-2">
      <Row className="g-4 mt-3 mx-3" xs={1} md={2} sm={2} lg={4}>
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
