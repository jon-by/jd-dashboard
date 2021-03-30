import React, { useState, useEffect, useReducer } from "react";
import FilterSection from "./FilterSection";
import { Manager } from "socket.io-client";
import { TRACKLIST_URL } from "./constants";
import { Scope, Main, PausedList } from "./Viewer.styled";
import useDebounce from "./useDebounce";
import ListHeader from "./ListHeader";
import { initialState, reducer } from "./ViewerSongListReducer";
import ViewerView from "./ViewerView";
import { getExtremeCost } from "./TwitchApi";

const handleFilter = (text, songList) => {
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

    //console.log(Object.keys(state.songList));
    dispatch({
      type: "setFilteredSongs",
      payload: handleFilter(debouncedFilter, list),
    });
  }, [debouncedFilter, state.songList]);

  useEffect(() => {
    window.Twitch.ext.onAuthorized(function (authentication) {
      dispatch({ type: "setAuth", payload: authentication });
    });
  }, []);

  useEffect(() => {
    // console.log("list status: ", state.listStatus);
  }, [state.listStatus]);

  useEffect(() => {
    if (state.auth) {
      const broadcaster = state.auth.channelId;
      const viewer = state.auth.userId.substring(1, state.auth.userId.length);

      //console.log(state.auth);

      getExtremeCost({ broadcasterId: state.auth.channelId })
        .then((response) => response.json())
        .then((data) => {
          dispatch({ type: "setExtremeCost", payload: data });
        })
        .catch((err) => console.log(err));

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
        auth: { broadcaster, viewer },
      });

      socket.on("connect", () => {
        //console.log("connected");
      });

      socket.on(broadcaster, ({ extremeCost }) => {
        dispatch({ type: "setExtremeCost", payload: extremeCost });
      });

      socket.on(
        `${broadcaster}-${viewer}`,
        ({ current, listStatus, listIds }) => {
          dispatch({
            type: "setViewer",
            payload: { current, listStatus, listIds },
          });
        }
      );
    }
  }, [state.auth]);

  return (
    <Scope>
      <ListHeader tickets={state.tickets} />
      {!state.loading && !state.selectedSong && (
        <FilterSection
          value={state.filter}
          onChange={(value) => {
            dispatch({ type: "setFilter", payload: value });
          }}
        />
      )}

      <Main>
        <ViewerView dispatch={dispatch} state={state} />
      </Main>
      {state.listStatus === "paused" && (
        <PausedList>
          <span>Paused</span>
        </PausedList>
      )}
    </Scope>
  );
};
export default Viewer;
