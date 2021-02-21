import React from "react";
import { COLORS } from "./constants";

import { ControlWrapper } from "./songControls.styled";
import { DoneIcon, CloseIcon } from "./icons";
import { IconButton } from "./songControls.styled";

const SongControls = () => {
  return (
    <ControlWrapper>
      <IconButton color={COLORS.GREEN}>
        <DoneIcon />
      </IconButton>
      <IconButton color={COLORS.RED}>
        <CloseIcon />
      </IconButton>
    </ControlWrapper>
  );
};

export default SongControls;
