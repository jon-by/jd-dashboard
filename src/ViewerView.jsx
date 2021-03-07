import React from "react";
import SelectedSong from "./SelectedSong";
import ViewerSongList from "./ViewerSongList";
import Spinner from "./Spinner";
import { addSongToList } from "./TwitchApi";

const handleAddSong = (userToken, song, dispatch) => {
  dispatch({ type: "setLoading", payload: true });
  addSongToList(userToken, song)
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
  React.useEffect;
  if (loading) {
    return <Spinner />;
  }
  if (selectedSong) {
    return (
      <SelectedSong
        song={selectedSong}
        onCancel={() => dispatch({ type: "setSelectedSong", payload: null })}
        onConfirm={() => handleAddSong(auth, selectedSong, dispatch)}
      />
    );
  }
  return (
    <ViewerSongList
      dispatch={dispatch}
      isLoading={loading}
      songList={filteredSongs}
    />
  );
};

export default ViewerView;
