import React, { useEffect, useState } from "react";
import SongCard from "./SongCard";

const ViewerSongList = ({
  songList,
  dispatch,
  listStatus,
  requestedSongs,
  extremeCost,
  bannedCost,
  bannedIds,
}) =>
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
          extremeCost={extremeCost}
          banned={bannedIds.includes(song.id) && bannedCost}
          key={index}
          {...song}
        />
      );
    }
  });

export default ViewerSongList;
