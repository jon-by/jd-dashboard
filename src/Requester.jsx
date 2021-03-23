import React from "react";
import { Wrapper, Name } from "./Requester.styled";

const Requester = ({ name, id, danced }) => {
  return (
    <Wrapper danced={danced}>
      <Name>{name}</Name>
    </Wrapper>
  );
};

export default Requester;
