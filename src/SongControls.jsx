import React from "react";
import { COLORS } from "./constants";

import { ControlWrapper } from "./songControls.styled";
import { DoneIcon, CloseIcon } from "./icons";
import { IconButton } from "./songControls.styled";

const SongControls = ({ removeSong, songId, token }) => {
  return (
    <ControlWrapper>
      <IconButton color={COLORS.GREEN}>
        <DoneIcon />
      </IconButton>
      <IconButton onClick={() => removeSong(token, songId)} color={COLORS.RED}>
        <CloseIcon />
      </IconButton>
    </ControlWrapper>
  );
};

export default SongControls;
