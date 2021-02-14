import React, { useState, useEffect } from "react";
import FilterSection from "./FilterSection";
import { Manager } from "socket.io-client";
import SongCard from "./SongCard";
import songList from "./jd-tracklist.json";
import { SONG_TYPES } from "./constants";
import { Scope, Main } from "./Viewer.styled";
import useDebounce from "./useDebounce";
import ViewerSongList from "./ViewerSongList";
import ListHeader from "./ListHeader";
import SelectedSong from "./SelectedSong";
import { addSongList } from "./TwitchApi";

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

const handleAddSong = (userToken, song, setLoading, setError) => {
  setLoading(true);
  addSongList(userToken, song);
};

const Viewer = () => {
  const [songList, setSongList] = useState(filteredSongs);
  const [filter, setFilter] = useState("");
  const [tickets, setTickets] = useState(0);
  const [selectedSong, setSelectedSong] = useState(null);
  const debouncedFilter = useDebounce(filter, 500);
  const [auth, setAuth] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    window.Twitch.ext.onAuthorized(function (authentication) {
      console.log("auth: ", authentication);
      setAuth(authentication.token);
    });

    if (debouncedFilter) {
      console.log(debouncedFilter);
      setSongList(handleFilter(debouncedFilter));
    } else {
      setSongList(filteredSongs);
    }
  }, [debouncedFilter]);

  useEffect(() => {
    const manager = new Manager("http://localhost:3000", {
      transports: ["websocket"],
    });
    const socket = manager.socket("/tickets", {
      auth: { broadcaster: 148003044, viewer: 148003044 },
    });
    socket.on("connect", () => {
      console.log("connected");
    });
    socket.on("148003044-148003044", ({ current }) => {
      setTickets(current);
    });

    // socket.on("148003044", (msg) => {
    //   console.log(msg);
    // });
  }, []);

  return (
    <Scope>
      <ListHeader tickets={tickets} />
      <FilterSection value={filter} onChange={setFilter} />

      <Main>
        {!selectedSong ? (
          <ViewerSongList onSelect={setSelectedSong} songList={songList} />
        ) : (
          <SelectedSong
            song={selectedSong}
            onCancel={() => setSelectedSong(null)}
            onConfirm={() =>
              handleAddSong(auth, selectedSong, setLoading, setError)
            }
          />
        )}
      </Main>
    </Scope>
  );
};

const Wrapper = (props) => {
  if (process.env.REACT_APP_ENV === "dev") {
    return <Viewer {...props} />;
  }
  return <Viewer {...props} />;
};

export default Wrapper;
