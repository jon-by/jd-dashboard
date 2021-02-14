import styled from "styled-components";

export const Scope = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 100%;
  max-height: 100%;
  background-color: #fff;
  height: 100%;
  overflow: hidden;
`;

export const Main = styled.div`
  box-sizing: border-box;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  overflow: auto;
  align-items: flex-start;
  flex: 1 1 auto;
  width: 100%;
  padding: 0 4px;
  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  & main::-webkit-scrollbar {
    display: none;
  }
`;
