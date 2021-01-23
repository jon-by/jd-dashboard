import React from "react";
import TwitchIcon from "./TwitchIcon.svg";

const auth = () => {
  window.open("http://localhost:3000/auth/twitch");
};

const Login = () => {
  return (
    <div>
      <button onClick={auth}>
        <img src={TwitchIcon} width="24" height="24" alt="Twitch" />
        Twitch auth
      </button>
    </div>
  );
};

export default Login;
