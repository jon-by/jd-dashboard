import styled from "styled-components";

export const Song = styled.div`
  order: ${(props) => (props.danced ? "1" : "0")};
  max-width: 320px;
  display: flex;
  flex-direction: column;
`;

export const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
