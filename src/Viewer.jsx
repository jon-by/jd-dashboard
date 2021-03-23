import React, { useState, useEffect, useReducer } from "react";
import FilterSection from "./FilterSection";
import { Manager } from "socket.io-client";
import SongCard from "./SongCard";
import { TRACKLIST_URL } from "./constants";
import { Scope, Main } from "./Viewer.styled";
import useDebounce from "./useDebounce";
import ViewerSongList from "./ViewerSongList";
import ListHeader from "./ListHeader";
import SelectedSong from "./SelectedSong";
import { initialState, reducer } from "./ViewerSongListReducer";
import ViewerView from "./ViewerView";

const handleFilter = (text, songList) => {
  console.log(songList);
  return songList.filter((song) => {
    return (
      song.name.toLowerCase().indexOf(text.toLowerCase()) > -1 ||
      song.artist.toLowerCase().indexOf(text.toLowerCase()) > -1
    );
  });
};

const Viewer = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const debouncedFilter = useDebounce(state.filter, 500);

  useEffect(() => {
    if (state.songList.length === 0) return;
    const list = [].concat(
      state.songList[state.currentGame],
      state.unlimited ? state.songList.unlimited : []
    );
    dispatch({
      type: "setFilteredSongs",
      payload: handleFilter(debouncedFilter, list),
    });
  }, [debouncedFilter, state.songList]);

  useEffect(() => {
    window.Twitch.ext.onAuthorized(function (authentication) {
      console.log("auth: ", authentication);
      dispatch({ type: "setAuth", payload: authentication.token });
    });
    fetch(TRACKLIST_URL).then((response) =>
      response
        .json()
        .then((data) => {
          dispatch({
            type: "setSongList",
            payload: data,
          });
        })
        .catch((err) => {
          dispatch({ type: "setLoading", payload: false });
        })
    );
    const manager = new Manager("http://localhost:3000", {
      transports: ["websocket"],
    });
    const socket = manager.socket("/viewer", {
      auth: { broadcaster: 148003044, viewer: 148003044 },
    });
    socket.on("connect", () => {
      console.log("connected");
    });
    socket.on("148003044-148003044", ({ current }) => {
      dispatch({ type: "setTickets", payload: current });
    });
  }, []);

  return (
    <Scope>
      <ListHeader tickets={state.tickets} />
      {!state.loading && !state.selectedSong && (
        <FilterSection
          value={state.filter}
          onChange={(value) => dispatch({ type: "setFilter", payload: value })}
        />
      )}

      <Main>
        <ViewerView dispatch={dispatch} state={state} />
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
