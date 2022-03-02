import { Tab, Tabs } from "react-bootstrap";
import PostTab from "./PostTab";
import HomeworkTab from "./HomeworkTab";
import StudentTab from "./StudentTab";

const ClassroomBody = ({ classroom }) => {
  return (
    <Tabs defaultActiveKey={"posts"}>
      <Tab eventKey={"posts"} title="Posts">
        <PostTab posts={classroom.posts} classroom={classroom} />
      </Tab>
      <Tab eventKey={"students"} title="Students">
        <StudentTab students={classroom.students} />
      </Tab>
      <Tab eventKey={"homeworks"} title="Homeworks">
        <HomeworkTab homeworks={classroom.homeworks} />
      </Tab>
    </Tabs>
  );
};

export default ClassroomBody;
