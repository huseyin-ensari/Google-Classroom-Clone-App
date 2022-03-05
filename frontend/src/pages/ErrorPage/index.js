import React from "react";
import { Button, Image } from "react-bootstrap";
import svgError from "./assets/404.svg";
import { LinkContainer } from "react-router-bootstrap";

const ErrorPage = () => {
  return (
    <div className="text-center mt-5">
      <Image
        className="mx-auto d-block"
        fluid
        src={svgError}
        alt="You are at the wrong place"
        width={500}
        height="auto"
      />
      <h3 className="mt-4">You seem lost</h3>
      <LinkContainer to={"/"}>
        <Button>Click to go to homepage</Button>
      </LinkContainer>
    </div>
  );
};

export default ErrorPage;
