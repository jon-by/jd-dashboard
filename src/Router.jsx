import { useReducer, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { reducer, initialState } from "./AuthReducer";

import "./Router.css";
import Nav from "./Nav";
import ProtectedRoute from "./ProtectedRoute";
import Panel from "./Panel";
import Login from "./Login";
import { API } from "./constants";

const fetchUser = (dispatch) => {
  dispatch({ type: "setLoading", payload: true });
  try {
    fetch(API.USER, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        return dispatch({ type: "setUser", payload: data });
      })
      .catch((err) => {
        dispatch({ type: "setLoading", payload: false });
        console.log(err);
      });
  } catch (error) {
    dispatch({ type: "setLoading", payload: false });
    console.log(error);
  }
};

const Router = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    if (state.token) {
      fetchUser(dispatch);
    }
  }, [state.token]);
  return !state.loading ? (
    <BrowserRouter>
      {state.token && (
        <Nav user={state.user} logout={() => dispatch({ type: "logout" })} />
      )}
      <main className="main">
        <Switch>
          <Route path="/login" children={<Login />} />
          <ProtectedRoute path="/" children={<Panel />} user={state.token} />
        </Switch>
      </main>
    </BrowserRouter>
  ) : (
    <div>loading...</div>
  );
};

export default Router;
