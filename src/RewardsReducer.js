const initialState = {
  rewards: [],
  loading: false,
  error: null,
};

function reducer(state, {type, payload}) {
  switch (type) {
    case "setLoading":
      return {
        ...state,
        loading: payload,
      };
    case "setError":
      return {
        ...state,
        error: payload,
      };
    case "setRewards":
      return {
        ...state,
        rewards: payload,
      };
    case "createReward":
      return {
        ...state,
        rewards: [...state.rewards, payload],
      };
    case "updateReward":
      return {
        ...state,
        rewards: state.rewards.map((rew) =>
          rew.id === payload.id ? payload : rew
        ),
      };
    case "deleteReward":
      return {
        ...state,
        rewards: state.rewards.filter((rew) =>
          rew.id !== payload
        ),
      };
    default:
      return state;
  }
}

export { initialState, reducer };
