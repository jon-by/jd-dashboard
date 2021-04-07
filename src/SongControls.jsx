import React from "react";
import { COLORS } from "./constants";

import { ControlWrapper } from "./songControls.styled";
import { DoneIcon, CloseIcon, ReturnIcon, BlockIcon } from "./icons";
import { IconButton } from "./songControls.styled";

const SongControls = ({
  removeSong,
  changeSongStatus,
  token,
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
              changeSongStatus(token, songId, false);
            }}
          >
            <ReturnIcon size={24} />
          </IconButton>
        </>
      ) : (
        <>
          <IconButton
            onClick={() => {
              changeSongStatus(token, songId, true);
            }}
            color={COLORS.GREEN}
          >
            <DoneIcon />
          </IconButton>
          <IconButton
            onClick={() => removeSong(token, songId)}
            color={COLORS.RED}
          >
            <CloseIcon />
          </IconButton>
        </>
      )}
    </ControlWrapper>
  );
};

export default SongControls;
