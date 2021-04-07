const initialState = {
  auth: null,
  error: false,
  config: null,
};

function reducer(state, { type, payload }) {
  switch (type) {
    case "setAuth":
      return {
        ...state,
        auth: payload,
      };
      break;
    case "setHasConfig":
      return {
        ...state,
        hasConfig: payload,
      };
      break;
    case "setConfig":
      return {
        ...state,
        config: payload,
      };
      break;
    case "setError":
      return {
        ...state,
        error: payload,
      };
      break;
    case "setExtremeCost":
      return {
        ...state,
        config: { ...state.config, extremeCost: payload },
      };
      break;

    case "setBannedCost":
      return {
        ...state,
        config: { ...state.config, bannedCost: payload },
      };
      break;

    case "setBannedSongs":
      return {
        ...state,
        bannedSongs: payload,
      };
      break;

    case "setBannedIds":
      return {
        ...state,
        bannedIds: payload,
      };
      break;

    default:
      return {
        ...state,
      };
      break;
  }
}

export { initialState, reducer };
