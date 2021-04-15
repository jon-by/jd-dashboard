import styled from "styled-components";

export const Song = styled.div`
  order: ${(props) => (props.danced ? "1" : "0")};
  display: flex;
  flex-direction: column;
`;
export const Songs = styled.div`
  display: flex;
  flex-flow: column;
`;

export const ListWrapper = styled.div`
  overflow: auto;
  max-width: 320px;
  max-height: 100%;
`;
