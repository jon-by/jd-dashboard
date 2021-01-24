import style from "styled-components";
import { btnVariants } from "./Button";
import { lighten, rgba } from "polished";
const StyledButton = style.button`
  border: none;
  font-family: inherit;
  padding: 0;
  margin: 0;
  background: transparent;
  user-select: none;
  text-transform: uppercase;
  transition: all 150ms ease;
  cursor:pointer;
  border-radius:4px;
  color: ${(props) => props.color};
  ${(props) => {
    if (props.variant !== btnVariants.outline) {
      return `background-color:${props.bgColor};`;
    }
    return `background:none;`;
  }}
  padding:4px 8px;
  &:hover{
    ${(props) => {
      if (props.variant === btnVariants.raised) {
        return `background-color: ${lighten(0.1, props.bgColor)};`;
      }
      if (props.variant === btnVariants.flat) {
        return `background-color: ${
          props.bgColor === "transparent"
            ? rgba(255, 255, 255, 0.2)
            : lighten(0.1, props.bgColor)
        };`;
      }
      if (props.variant === btnVariants.outline) {
        return `background-color: ${lighten(0.1, props.bgColor)};`;
      }
    }}
  }
`;

export default StyledButton;
