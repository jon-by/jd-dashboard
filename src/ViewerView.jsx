import React from "react";
import SelectedSong from "./SelectedSong";
import ViewerSongList from "./ViewerSongList";
import Spinner from "./Spinner";
import { addSongToList } from "./TwitchApi";

const handleAddSong = (userToken, song, dispatch, extremeCost) => {
  song.difficulty >= 4 && (song = { ...song, difficulty: 4 });

  const newSong = { ...song, cost: song.difficulty >= 4 ? extremeCost : 1 };

  dispatch({ type: "setLoading", payload: true });

  addSongToList(userToken, { ...newSong, danced: false })
    .then((res) => {
      dispatch({ type: "setSelectedSong", payload: null });
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: "setLoading", payload: false });
    });
};

const ViewerView = ({ state, dispatch }) => {
  const { loading, selectedSong, auth, filteredSongs } = state;
  if (loading) {
    return <Spinner />;
  }
  if (selectedSong) {
    return (
      <SelectedSong
        song={selectedSong}
        onCancel={() => dispatch({ type: "setSelectedSong", payload: null })}
        onConfirm={() =>
          handleAddSong(auth.token, selectedSong, dispatch, state.extremeCost)
        }
        extremeCost={state.extremeCost}
      />
    );
  }
  return (
    <ViewerSongList
      listStatus={state.listStatus}
      dispatch={dispatch}
      isLoading={loading}
      songList={filteredSongs}
      extremeCost={state.extremeCost}
      requestedSongs={state.requestedSongs}
    />
  );
};

export default ViewerView;
