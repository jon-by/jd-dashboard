import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Router from "./Router";
import Viewer from "./Viewer";
import Broadcaster from "./Broadcaster";

if (process.env.REACT_APP_BUILD_TARGET === "viewer") {
  ReactDOM.render(<Viewer />, document.getElementById("root"));
} else if (process.env.REACT_APP_BUILD_TARGET === "broadcaster") {
  ReactDOM.render(<Broadcaster />, document.getElementById("root"));
} else {
  ReactDOM.render(
    <React.StrictMode>
      <Router />
    </React.StrictMode>,
    document.getElementById("root")
  );
}
