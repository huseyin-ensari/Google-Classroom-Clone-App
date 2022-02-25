import React from "react";
import emptySVG from "./assets/empty.svg";
import { Image } from "react-bootstrap";

const NoClassroom = () => {
  return (
    <div className="text-center">
      <Image
        className="mx-auto d-block"
        fluid
        src={emptySVG}
        alt="There are no classroom you entered"
        width={300}
        height="auto"
      />
      <h3 className="mt-2">There are no classroom you entered</h3>
    </div>
  );
};

export default NoClassroom;
