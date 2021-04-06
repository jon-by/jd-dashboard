import React, { useEffect, useState } from "react";
import { TRACKLIST_URL } from "./constants";
import SongCard from "./SongCard";
import { BannedSongWrapper, SongList } from "./BannedSong.styled";
import FilterSection from "./FilterSection";
import useDebounce from "./useDebounce.js";

const SongsToBan = ({ setFullBannedSong }) => {
  const [filterTerm, setFilterTerm] = useState("");
  const debouncedSongs = useDebounce(filterTerm, 500);
  const [songList, setSongList] = useState([]);
  const [filteredSongs, setFilteredSongs] = useState([]);
  const [bannedSongs, setBannedSongs] = useState([]);

  useEffect(() => {
    const text = filterTerm.toLowerCase();
    const songs = songList.filter((song) => {
      if (
        song.name.toLowerCase().indexOf(text) > -1 ||
        song.artist.toLowerCase().indexOf(text) > -1
      )
        return song;
    });

    setFilteredSongs(songs);
  }, [debouncedSongs]);

  useEffect(() => {
    const fullBannedSong = songList.filter((song) => {
      return bannedSongs.some((id) => song.id === id) && song;
    });

    setFullBannedSong(fullBannedSong);
  }, [bannedSongs]);

  useEffect(() => {
    var songs = [];
    fetch(TRACKLIST_URL)
      .then((json) => json.json())
      .then((data) => {
        Object.keys(data).map((key) => {
          songs = songs.concat(data[key]);
          return false;
        });
        setSongList(songs);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    setFilteredSongs(songList);
  }, [songList]);

  const handleBanSong = (id) => {
    const addNewBanned = [...bannedSongs].concat(id);
    setBannedSongs(addNewBanned);
  };

  return (
    <BannedSongWrapper>
      <FilterSection value={filterTerm} setSearchTerm={setFilterTerm} />

      <SongList>
        <div>
          {filteredSongs.map((song, idx) => {
            if (
              bannedSongs.some((banned) => {
                return song.id === banned;
              })
            ) {
              return false;
            } else {
              return (
                <SongCard
                  key={idx}
                  showControls={true}
                  showBanButton={true}
                  onBanSong={handleBanSong}
                  {...song}
                />
              );
            }
          })}
        </div>
      </SongList>
    </BannedSongWrapper>
  );
};

export default SongsToBan;
