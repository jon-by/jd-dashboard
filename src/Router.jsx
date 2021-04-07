import { useReducer, useEffect, useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import "./Router.css";
import Panel from "./Panel";
import Viewer from "./Viewer";
import Broadcaster from "./Broadcaster";
import OverlayList from "./OverlayList";

import Config from "./Config";

const Router = () => {
  return (
    <BrowserRouter>
      <main className="main">
        <Switch>
          {process.env.REACT_APP_ENV === "dev" && (
            <>
              <Route path="**/viewer.html" children={<Viewer />} />
              <Route path="**/broadcaster.html" children={<Broadcaster />} />
              <Route path="/video_overlay.html" children={<OverlayList />} />
              <Route path="/config.html" children={<Config />} />
            </>
          )}
        </Switch>
      </main>
    </BrowserRouter>
  );
};

export default Router;
