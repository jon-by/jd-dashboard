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
