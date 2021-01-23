import React from "react";
import TwitchIcon from "./TwitchIcon.svg";

// const auth = () => {
//   window.open("http://localhost:3000/auth/twitch");
// };
const fetchAuth = () => {
  fetch("http://localhost:3000/auth/twitch").then(res => console.log(res))
};

const Login = () => {
  return (
    <div>
      <a href="http://localhost:3000/auth/twitch">
      {/* <button onClick={fetchAuth}> */}
      {/* <button onClick={auth}> */}
        <img src={TwitchIcon} width="24" height="24" alt="Twitch" />
        Twitch auth

      {/* </button> */}
      </a>
    </div>
  );
};

export default Login;
