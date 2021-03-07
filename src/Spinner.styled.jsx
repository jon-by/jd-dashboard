import styled, { keyframes, css } from "styled-components";

const animation = keyframes`
 0%,
  80%,
  100% {
    box-shadow: 0 0;
    height: 4em;
  }
  40% {
    box-shadow: 0 -2em;
    height: 5em;
  }`;

const commonStyles = css`
  background: #e17fb3;
  animation: ${animation} 1s infinite ease-in-out;
  width: 1em;
  height: 4em;
`;

export const SpinnerStyled = styled.div`
  ${commonStyles}
  color: #e17fb3;
  text-indent: -9999em;
  margin: 88px auto;
  position: relative;
  font-size: 11px;
  transform: translateZ(0);
  animation-delay: -0.16s;

  &:after {
    ${commonStyles}
    position: absolute;
    top: 0;
    content: "";
    left: 1.5em;
  }

  &:before {
    ${commonStyles}
    position: absolute;
    top: 0;
    content: "";
    left: -1.5em;
    animation-delay: -0.32s;
  }
`;

export const SpinnerWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #fff;
  z-index: 2;
  overflow: hidden;
  margin: 0;
`;
