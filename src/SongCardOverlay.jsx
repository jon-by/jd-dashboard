import React from "react";
import { Overlay } from "./SongCardOverlay.styled";
import { BlockIcon, ReturnIcon } from "./icons";

const SongCardOverlay = ({ overlay }) => {
  return (
    <Overlay>{overlay === "ban" ? <div>BAN</div> : <div>UNBAN</div>}</Overlay>
  );
};

export default SongCardOverlay;
