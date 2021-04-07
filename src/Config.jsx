import React, { useEffect, useState, useReducer } from "react";
import { initialState, reducer } from "./configReducer";
import {
  ConfigWrapper,
  CostsWrapper,
  BannedControl,
  SongsToBanWrapper,
} from "./Config.styled";
import { setExtremeCost, getExtremeCost } from "./TwitchApi";
import CostsConfig from "./CostsConfig";

const Config = ({ user }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    getExtremeCost({ broadcasterId: user.id })
      .then((response) => response.json())
      .then((data) => dispatch({ type: "setExtremeCost", payload: data }))
      .catch((err) => {
        dispatch({ type: "setError", payload: true });
        console.error(err);
      });
  }, []);

  return (
    <ConfigWrapper>
      <CostsWrapper>
        <CostsConfig
          cost={state.extremeCost}
          error={state.error}
          setCost={(e) =>
            dispatch({ type: "setExtremeCost", payload: e.target.value })
          }
          user={user}
        >
          Extreme Cost
        </CostsConfig>

        <CostsConfig
          cost={state.bannedCost}
          error={state.error}
          setCost={(e) =>
            dispatch({ type: "setBannedCost", payload: e.target.value })
          }
          user={user}
        >
          Banned Cost
        </CostsConfig>
      </CostsWrapper>

      {/* <BannedControl>
        <SongsToBanWrapper>
          <SongsToBan
            bannedSongs={bannedSongs}
            setBannedSongs={setBannedSongs}
            setFullBannedSong={setFullBannedSong}
          />
        </SongsToBanWrapper>

        <BannedSongs
          fullBannedSong={fullBannedSong}
          setFullBannedSong={setFullBannedSong}
          handleUnBan={handleUnBan}
        />
      </BannedControl> */}

      {/* <Snackbar
        open={costSuccess}
        autoHideDuration={3000}
        onClose={() => handleClose("success")}
      >
        <Alert severity="success">Cost updated</Alert>
      </Snackbar>
      <Snackbar
        open={costError}
        autoHideDuration={3000}
        onClose={() => handleClose("error")}
      >
        <Alert severity="error">Error while updating</Alert>
      </Snackbar> */}
    </ConfigWrapper>
  );
};

export default Config;
