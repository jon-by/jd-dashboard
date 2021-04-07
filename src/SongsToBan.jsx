import React, { useEffect, useState } from "react";
import { TRACKLIST_URL } from "./constants";
import SongCard from "./SongCard";
import {
  BannedSongWrapper,
  SongList,
  SongsToBanTitle,
  SongListWrapper,
  SongsToBanHeader,
} from "./SongsToBan.styled";
import FilterSection from "./FilterSection";
import useDebounce from "./useDebounce.js";
import { TrainOutlined } from "@material-ui/icons";

const SongsToBan = ({ setFullBannedSong, bannedSongs, setBannedSongs }) => {
  const [filterTerm, setFilterTerm] = useState("");
  const debouncedSongs = useDebounce(filterTerm, 500);
  const [songList, setSongList] = useState([]);
  const [filteredSongs, setFilteredSongs] = useState([]);
  const [filteredIds, setFilteredIds] = useState({});

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

  const handleBanSong = (song) => {
    const addNewBanned = [...bannedSongs, song];
    const addNewBannedId = { ...bannedIds, [song.id]: song.id };
    setBannedSongs(addNewBanned);
  };

  return (
    <BannedSongWrapper>
      <SongsToBanHeader>
        <SongsToBanTitle>Allowed Songs</SongsToBanTitle>
        <FilterSection value={filterTerm} setSearchTerm={setFilterTerm} />
      </SongsToBanHeader>
      <SongListWrapper>
        <SongList>
          <div>
            {filteredSongs.map((song, idx) => {
              if (bannedIds.hasOwnProperty(song.id)) {
                return false;
              } else {
                return (
                  <SongCard
                    showOverlay={true}
                    overlay={"ban"}
                    key={idx}
                    onClick={() => handleBanSong(song)}
                    {...song}
                  />
                );
              }
            })}
          </div>
        </SongList>
      </SongListWrapper>
    </BannedSongWrapper>
  );
};

export default SongsToBan;
