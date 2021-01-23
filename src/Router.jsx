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
  // axios.get(API.USER.GET, {
  //   credentials: "same-origin",
  //   mode: "no-cors",
  //   withCredentials: true,
  //   crossdomain: true,
  //   headers: {
  // 		'Access-Control-Allow-Origin': '*',
  // 		Accept: 'application/json',
  // 		'Content-Type': 'application/json',
  // 	},
  // }).then(res => res.json())
  // .then((data) => {
  //   console.log(data);
  //   setUser(data);
  // })
  // .catch((err) => console.log(err));
  try {
    
    fetch(API.USER.GET, {
      credentials: "include",
      mode: "no-cors"
    })
      .then((res) => {
        const json = res.json();
        return json;
      })
      .then((data) => {
        console.log(data);
        // return setUser(data);
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
  const toggleUser = () => setUser(!user);
  return (
    <BrowserRouter>
      <Nav />
      <button onClick={toggleUser}>toggle</button>
      <Switch>
        <Route path="/login" children={<Login />} user={user} />
        <ProtectedRoute path="/panel" children={<Panel />} user={user} />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
