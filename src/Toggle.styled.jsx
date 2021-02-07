import styled from "styled-components";
import { STATUS, COLORS } from "./constants";

export const Wrapper = styled.div`
  width: 35px;
  height: 20px;
  border: 2px solid;
  border-radius: 20px;
  padding: 2px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  border-color: ${(props) => (props.value ? COLORS.PURPLE : COLORS.GRAY)};
  cursor: pointer;
  user-select: none;
  transition: border 150ms ease;
`;

export const Check = styled.div`
  width: 5px;
  height: 10px;
  border-right: solid 2px ${COLORS.PURPLE};
  border-bottom: solid 2px ${COLORS.PURPLE};
  transform: translate(4px, 0px) rotate(45deg);
  opacity: ${(props) => (props.value ? "1" : "0")};
  transition: opacity 150ms ease;
`;

export const Circle = styled.div`
  width: 12px;
  height: 12px;
  background-color: ${(props) => (props.value ? COLORS.PURPLE : COLORS.GRAY)};
  border-radius: 50px;
  transform: translateX(
    ${(props) => (props.value ? "0" : "calc(-100% - 2px)")}
  );
  transition: all 150ms ease;
`;
