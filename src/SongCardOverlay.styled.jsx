import styled from "styled-components";

export const Overlay = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: opacity 300ms ease;
  opacity: 0;
  color: white;

  &:hover {
    opacity: 1;
  }
`;
