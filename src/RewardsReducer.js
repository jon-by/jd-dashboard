const initialState = {
  rewards: [],
  loading: true,
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
        editingReward: payload ? state.editingReward : null,
      };
    case "setError":
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case "setRewards":
      return {
        ...state,
        rewards: payload,
        loading: false,
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
        editingReward: null,
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
