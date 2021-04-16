import React from "react";
import { COLORS } from "./constants";

import { ControlWrapper } from "./songControls.styled";
import { DoneIcon, CloseIcon, ReturnIcon, BlockIcon } from "./icons";
import { IconButton } from "./songControls.styled";

const SongControls = ({
  removeSong,
  changeSongStatus,
  songId,
  danced = false,
  showBanButton = false,
  onBanSong,
  showUnbanButton = false,
}) => {
  return (
    <ControlWrapper>
      {danced ? (
        <>
          <IconButton
            color={COLORS.GREEN}
            onClick={() => {
              changeSongStatus(songId, false);
            }}
          >
            <ReturnIcon size={24} />
          </IconButton>
        </>
      ) : (
        <>
          <IconButton
            onClick={() => {
              changeSongStatus(songId, true);
            }}
            color={COLORS.GREEN}
          >
            <DoneIcon />
          </IconButton>
          <IconButton onClick={() => removeSong(songId)} color={COLORS.RED}>
            <CloseIcon />
          </IconButton>
        </>
      )}
    </ControlWrapper>
  );
};

export default SongControls;
