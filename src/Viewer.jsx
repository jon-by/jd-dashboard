import React, { useState, useEffect } from "react";
import FilterSection from "./FilterSection";
import { io } from "socket.io-client";
import SongCard from "./SongCard";
import songList from "./jd-tracklist.json";
import { SONG_TYPES } from "./constants";
import { Scope, Main } from "./Viewer.styled";
import useDebounce from "./useDebounce";

const tracks = songList.find(({ game }) => {
  return (game = "2021");
}).tracks;

const filteredSongs = Object.keys(tracks)
  .filter((type) => SONG_TYPES.includes(type))
  .map((key) => tracks[key])
  .flat();

const handleFilter = (text) => {
  return filteredSongs.filter((song) => {
    return (
      song.name.toLowerCase().indexOf(text.toLowerCase()) > -1 ||
      song.artist.toLowerCase().indexOf(text.toLowerCase()) > -1
    );
  });
};

const Viewer = () => {
  const [songList, setSongList] = useState(filteredSongs);
  const [filter, setFilter] = useState("");
  const debouncedFilter = useDebounce(filter, 500);

  useEffect(() => {
    if (debouncedFilter) {
      console.log(debouncedFilter);
      setSongList(handleFilter(debouncedFilter));
    } else {
      setSongList(filteredSongs);
    }
  }, [debouncedFilter]);

  useEffect(() => {
    const socket = io("http://localhost:3000", {
      transports: ["websocket"],
    });
    socket.on("connection", (soc) => {
      console.log(soc);
    });
  }, []);

  return (
    <Scope>
      <FilterSection value={filter} onChange={setFilter} />
      <Main>
        {songList.map((song) => {
          return <SongCard {...song} />;
        })}
      </Main>
    </Scope>
  );
};

const Wrapper = (props) => {
  if (process.env.REACT_APP_ENV === "dev") {
    return (
      <div style={{ width: 320, height: 500, overflow: "auto" }}>
        <Viewer {...props} />
      </div>
    );
  }
  return <Viewer {...props} />;
};

export default Wrapper;
