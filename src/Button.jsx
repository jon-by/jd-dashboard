import StyledButton from "./Button.style";
import { COLORS } from "./constants";

export const btnVariants = {
  raised: "raised",
  flat: "flat",
  outline: "outline",
  circle: "circle",
};

const Button = ({
  children,
  onClick,
  color = "#fff",
  bgColor = COLORS.DARK_PINK,
  variant = btnVariants.raised,
}) => {
  return (
    <StyledButton
      onClick={onClick}
      color={color}
      bgColor={bgColor}
      variant={btnVariants[variant]}
    >
      {children}
    </StyledButton>
  );
};

export default Button;
