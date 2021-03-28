import React, { useEffect, useState } from "react";
import SongCard from "./SongCard";

const ViewerSongList = ({ songList, dispatch, listStatus }) =>
  songList.map((song, index) => (
    <SongCard
      onClick={() =>
        listStatus === "active" &&
        dispatch({ type: "setSelectedSong", payload: song })
      }
      key={index}
      {...song}
    />
  ));

export default ViewerSongList;
