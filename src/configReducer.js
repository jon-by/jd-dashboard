const initialState = {
  error: false,
  extremeCost: 5,
  bannedCost: 10,
  bannedSongs: [],
  bannedIds: [],
};

function reducer(state, { type, payload }) {
  switch (type) {
    case "setError":
      return {
        ...state,
        error: payload,
      };
      break;
    case "setExtremeCost":
      return {
        ...state,
        extremeCost: payload,
      };
      break;

    case "setBannedCost":
      return {
        ...state,
        bannedCost: payload,
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
