import React from "react";
import { LIST_STATUS } from "./constants";
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
            listStatus === LIST_STATUS.ACTIVE &&
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
