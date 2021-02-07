import React from "react";
import { Toggled, Wrapper, Check, Circle } from "./Toggle.styled";

const Toggle = ({ value, onChange }) => (
  <Wrapper value={value} onClick={() => onChange(!value)}>
    <Check value={value} />
    <Circle value={value} />
  </Wrapper>
);

export default Toggle;
