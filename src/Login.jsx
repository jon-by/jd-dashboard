import React from "react";
import TwitchIcon from "./TwitchIcon.svg";

const Login = () => {
  return (
    <div>
      <a href="http://localhost:3000/auth/twitch">
        <img src={TwitchIcon} width="24" height="24" alt="Twitch" />
        Twitch auth
      </a>
    </div>
  );
};

export default Login;
