import React from "react";
import SongCard from "./SongCard";

const ViewerSongList = ({ songList, onSelect }) => {
  return songList.map((song, index) => {
    return <SongCard onClick={() => onSelect(song)} key={index} {...song} />;
  });
};

export default ViewerSongList;
