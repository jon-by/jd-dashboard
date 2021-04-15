import React, { useState, useEffect, useReducer } from "react";
import FilterSection from "./FilterSection";
import { Manager } from "socket.io-client";
import { TRACKLIST_URL } from "./constants";
import { Scope, Main, PausedList } from "./Viewer.styled";
import useDebounce from "./useDebounce";
import ListHeader from "./ListHeader";
import { initialState, reducer } from "./ViewerSongListReducer";
import ViewerView from "./ViewerView";
import { getExtremeCost, getTwitchConfig } from "./TwitchApi";

const handleFilter = (text, songList) => {
  return songList.filter((song) => {
    return (
      song.name.toLowerCase().indexOf(text.toLowerCase()) > -1 ||
      song.artist.toLowerCase().indexOf(text.toLowerCase()) > -1
    );
  });
};

const getCost = ({ bannedIds, bannedCost, extremeCost, difficulty, id }) => {
  const banned = bannedIds.includes(id);
  if (banned) {
    return Number(bannedCost);
  }
  return difficulty >= 4 ? extremeCost : 1;
};

const Viewer = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const debouncedFilter = useDebounce(state.filter, 500);

  useEffect(() => {
    if (state.songList.length === 0) return;

    const list = state.songList;

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
    getTwitchConfig(() => {
      console.log(window.Twitch.ext.configuration);
      dispatch({
        type: "setConfig",
        payload: JSON.parse(
          window.Twitch.ext.configuration.broadcaster.content
        ),
      });
    });
    window.Twitch.ext.listen("broadcast", (target, contentType, msg) => {
      //console.log(target, contentType, msg);
      const { type, data } = JSON.parse(msg);
      if (type === "configChange") {
        dispatch({ type: "setConfig", payload: data });
      }
    });
  }, []);

  useEffect(() => {
    if (state.auth) {
      const broadcaster = state.auth.channelId;
      const viewer = state.auth.userId.substring(1, state.auth.userId.length);

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
            const { bannedIds, bannedCost, extremeCost } = state;
            const newSongList = []
              .concat(
                data[state.config.game],
                state.config.unlimited ? data["unlimited"] : []
              )
              .map((song) => ({
                ...song,
                cost: getCost({
                  bannedIds,
                  bannedCost,
                  extremeCost,
                  difficulty: song.difficulty,
                  id: song.id,
                }),
              }));
            dispatch({
              type: "setSongList",
              payload: newSongList,
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
  }, [state.auth, state.config]);

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
