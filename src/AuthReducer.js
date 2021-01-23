import { COOKIE_AUTH_KEY } from "./constants";
import { getCookie, deleteCookie } from "./utils";

const initialState = {
  user: null,
  loading: false,
  token: getCookie(COOKIE_AUTH_KEY),
};

function reducer(state, action) {
  switch (action.type) {
    case "setUser":
      return {
        ...state,
        user: action.payload,
      };
    case "logout":
      deleteCookie(COOKIE_AUTH_KEY);
      return { ...initialState, token: null };
    default:
      return state;
  }
}

export { initialState, reducer };
