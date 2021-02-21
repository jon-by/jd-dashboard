import styled from "styled-components";
import { lighten } from "polished";

export const ControlWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  position: absolute;
  right: 10px;
  top: 0px;
  height: 100%;
`;

export const IconButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;
  transition: background 200ms easy;
  border-radius: 50%;
  box-shadow: 1px 1px 5px 0px rgba(0, 0, 0, 0.5);
  background-color: ${(props) => props.color};
  &:hover {
    background-color: ${(props) => lighten(0.1, props.color)};
  }
  & svg {
    fill: #ddd;
  }
`;
