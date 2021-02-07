import React from "react";
import { Wrapper, Name } from "./Requester.styled";

const Requester = ({ name, id }) => {
  return (
    <Wrapper>
      <Name>{name}</Name>
    </Wrapper>
  );
};

export default Requester;
