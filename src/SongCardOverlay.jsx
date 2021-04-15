import React from "react";
import { Overlay } from "./SongCardOverlay.styled";
import { BlockIcon, ReturnIcon } from "./icons";

const SongCardOverlay = ({ overlay }) => {
  return <Overlay>{overlay}</Overlay>;
};

export default SongCardOverlay;
