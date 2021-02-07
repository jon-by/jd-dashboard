import styled from "styled-components";
import { COLORS } from "./constants";

export const Header = styled.header`
  background-color: ${COLORS.PURPLE};
  padding: 8px;
`;

export const Title = styled.div`
  display: flex;
  margin-bottom: 4px;
  color: #fff;
  justify-content: space-between;
`;

export const Filter = styled.div`
  display: flex;
  & input {
    box-sizing: border-box;
    background-color: white;
    border: none;
    border-radius: 8px;
    flex-grow: 1;
    padding: 0;
    outline: 0;
    padding: 4px;
    text-indent: 8px;
  }
  & select {
    border: none;
    flex-shrink: 0;
    margin-left: 4px;
    background-color: white;
    border-radius: 8px;
  }
`;
