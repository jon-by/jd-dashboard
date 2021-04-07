import React, { useEffect } from "react";
import SongCard from "./SongCard";

import { BannedSongsWrapper, SongList } from "./BannedSongs.styled";
const BannedSongs = ({ fullBannedSong, handleUnBan }) => {
  return (
    <BannedSongsWrapper>
      <span>Banned Songs</span>
      <SongList>
        {fullBannedSong.map((song, idx) => {
          return (
            <SongCard
              key={idx}
              onClick={() => handleUnBan(song.id)}
              showOverlay={true}
              overlay={"unBan"}
              {...song}
            />
          );
        })}
      </SongList>
    </BannedSongsWrapper>
  );
};

export default BannedSongs;
