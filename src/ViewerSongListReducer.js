const initialState = {
  songList: [],
  filteredSongs: [],
  filter: "",
  tickets: 0,
  selectedSong: null,
  auth: null,
  loading: true,
  error: null,
  currentGame: "2021",
  unlimited: true,
  requestedSongs: {},
  listStatus: null,
};

function reducer(state, { type, payload }) {
  switch (type) {
    case "setSongList":
      return {
        ...state,
        songList: payload,
        filteredSongs: [].concat(
          payload[state.currentGame],
          state.unlimited ? payload.unlimited : []
        ),
        loading: false,
      };
    case "setFilteredSongs":
      return {
        ...state,
        filteredSongs: payload,
      };
    case "setFilter":
      return {
        ...state,
        filter: payload,
      };
    case "setTickets":
      return {
        ...state,
        tickets: payload,
      };
    case "setSelectedSong":
      return {
        ...state,
        selectedSong: payload,
        loading: false,
      };
    case "setAuth":
      return {
        ...state,
        auth: payload,
      };
    case "setLoading": {
      return {
        ...state,
        loading: payload,
      };
    }
    case "setError":
      return {
        error: payload,
      };

    default:
      return state;
  }
}

export { initialState, reducer };
