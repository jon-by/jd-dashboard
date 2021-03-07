import React, { useEffect, useState } from "react";
import SongCard from "./SongCard";

const ViewerSongList = ({ songList, dispatch }) =>
  songList.map((song, index) => (
    <SongCard
      onClick={() => dispatch({ type: "setSelectedSong", payload: song })}
      key={index}
      {...song}
    />
  ));

export default ViewerSongList;
