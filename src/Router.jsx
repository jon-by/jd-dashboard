import { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import axios from "axios";

import "./App.css";
import Nav from "./Nav";
import ProtectedRoute from "./ProtectedRoute";
import Panel from "./Panel";
import Login from "./Login";

import { COOKIE_AUTH_KEY, API } from "./constants";
import { getCookie } from "./utils";

const fetchUser = (token, setUser) => {
  try {
    fetch(API.USER.GET, {
      credentials: "include",      
    })
      .then((res) => res.json())
      .then((data) => {
        return setUser(data);
      })
      .catch((err) => console.log(err));
  } catch (error) {
    console.log(error)
  }

};

const Router = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const token = getCookie(COOKIE_AUTH_KEY);
    if (token) {
      fetchUser(token, setUser);
    }
  }, []);
  return (
    <BrowserRouter>
      {user && <Nav user={user}/>}
      <Switch>
        <Route path="/login" children={<Login />} user={user} />
        <ProtectedRoute path="/" children={<Panel />} user={user} />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
