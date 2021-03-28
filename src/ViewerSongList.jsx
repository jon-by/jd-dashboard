import React, { useEffect, useState } from "react";
import SongCard from "./SongCard";

const ViewerSongList = ({ songList, dispatch, listStatus, requestedSongs }) =>
  songList.map((song, index) => {
    if (requestedSongs.some((id) => id === song.id)) {
      return false;
    } else {
      return (
        <SongCard
          onClick={() =>
            listStatus === "active" &&
            dispatch({ type: "setSelectedSong", payload: song })
          }
          key={index}
          {...song}
        />
      );
    }
  });

export default ViewerSongList;
