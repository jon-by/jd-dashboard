import styled from "styled-components";

export const Scope = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 320px;
  max-height: 500px;
  background-color: #fff;
  height: 100%;
`;

export const Main = styled.div`
  box-sizing: border-box;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  overflow: auto;
  align-items: center;
  width: 100%;
  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  & main::-webkit-scrollbar {
    display: none;
  }
`;
