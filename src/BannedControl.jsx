import React, { useEffect, useState } from "react";
import { TRACKLIST_URL } from "./constants";
import { Wrapper } from "./bannedControl.styled";
import BannedSongList from "./BannedSongList";
const BannedControl = ({ auth, error, config, dispatch }) => {
  const [bannedSongs, setBannedSongs] = useState({});
  const [songList, setSongList] = useState([]);

  useEffect(() => {
    fetch(TRACKLIST_URL)
      .then((raw) => raw.json())
      .then((data) => {
        let songs = [];
        Object.keys(data).map((key) => {
          songs = songs.concat(data[key]);
          return false;
        });
        setSongList(songs);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    const bannedSongs = songList.filter((song) => {});
  }, [config.bannedIds]);

  return (
    <Wrapper>
      <BannedSongList songList={songList} />
      <BannedSongList songList={bannedSongs} />
    </Wrapper>
  );
};

export default BannedControl;
