const initialState = {
  rewards: [],
  loading: false,
  error: null,
  isEditModalOpen: false,
  editingReward: null,
};

function reducer(state, { type, payload }) {
  switch (type) {
    case "setLoading":
      return {
        ...state,
        loading: payload,
      };

    case "setEditingReward":
      return {
        ...state,
        editingReward: payload,
        isEditModalOpen: true,
      };

    case "setEditModalOpen":
      return {
        ...state,
        isEditModalOpen: payload,
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
        isEditModalOpen: false,
      };
    case "updateReward":
      return {
        ...state,
        rewards: state.rewards.map((rew) =>
          rew.id === payload.id ? payload : rew
        ),
        isEditModalOpen: false,
      };
    case "deleteReward":
      return {
        ...state,
        rewards: state.rewards.filter((rew) => rew.id !== payload),
      };
    default:
      return state;
  }
}

export { initialState, reducer };
