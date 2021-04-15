const initialState = {
  auth: null,
  error: false,
  config: null,
  bannedSongs: {},
  alert: "",
  songList: [],
};

function reducer(state, { type, payload }) {
  switch (type) {
    case "setAuth":
      return {
        ...state,
        auth: payload,
      };
    case "setSongList":
      return {
        ...state,
        songList: payload,
      };

    case "setAlert":
      return {
        ...state,
        alert: payload,
      };

    case "setHasConfig":
      return {
        ...state,
        hasConfig: payload,
      };

    case "setConfig":
      return {
        ...state,
        config: payload,
      };

    case "setError":
      return {
        ...state,
        error: payload,
      };

    case "setExtremeCost":
      return {
        ...state,
        config: { ...state.config, extremeCost: payload },
      };

    case "setBannedCost":
      return {
        ...state,
        config: { ...state.config, bannedCost: payload },
      };

    case "setBannedSongs":
      return {
        ...state,
        bannedSongs: payload,
      };

    case "setBannedIds":
      return {
        ...state,
        bannedIds: payload,
      };

    default:
      return {
        ...state,
      };
  }
}

export { initialState, reducer };
