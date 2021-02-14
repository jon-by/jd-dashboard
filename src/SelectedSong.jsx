import React from "react";
import SongCard from "./SongCard";
import { Container, BtnWrapper } from "./SelectedSong.styled";
import Button from "./Button";
import { COLORS } from "./constants";

const SelectedSong = ({ song, onCancel, onConfirm }) => {
  return (
    <Container>
      <SongCard {...song} />

      <BtnWrapper>
        <Button bgColor={COLORS.RED} onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={() => onConfirm()} bgColor={COLORS.GREEN}>
          Confirm
        </Button>
      </BtnWrapper>
    </Container>
  );
};

export default SelectedSong;
