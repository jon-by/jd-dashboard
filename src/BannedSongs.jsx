import React, { useEffect } from "react";
import SongCard from "./SongCard";
const BannedSongs = ({ fullBannedSong, setFullBannedSong }) => {
  useEffect(() => {
    console.log();
  }, []);
  return (
    <div>
      {fullBannedSong.map((song) => {
        return <SongCard {...song} />;
      })}
    </div>
  );
};

export default BannedSongs;
