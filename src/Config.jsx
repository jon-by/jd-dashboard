import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Button from "./Button";
import {
  ConfigWrapper,
  CostsWrapper,
  BannedControl,
  SongsToBanWrapper,
} from "./Config.styled";
import { setExtremeCost, getExtremeCost } from "./TwitchApi";
import ExtremeCost from "./ExtremeCost";
import SongsToBan from "./SongsToBan";
import BannedCost from "./BannedCost";
import BannedSongs from "./BannedSongs";

const Config = ({ user }) => {
  const [cost, setCost] = useState(5);
  const [costError, setCostError] = useState(false);
  const [costSuccess, setCostSuccess] = useState(false);
  const [fullBannedSong, setFullBannedSong] = useState([]);

  useEffect(() => {
    getExtremeCost({ broadcasterId: user.id })
      .then((response) => response.json())
      .then((data) => setCost(data))
      .catch((err) => {
        setCostError(true);
        console.log(err);
      });
  }, []);

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  const handleClose = (event) => {
    switch (event) {
      case "success":
        setCostSuccess(false);
        break;
      case "error":
        setCostError(false);
        break;

      default:
        break;
    }
  };

  return (
    <ConfigWrapper>
      <CostsWrapper>
        <ExtremeCost
          setCostError={setCostError}
          setCostSuccess={setCostSuccess}
          cost={cost}
          setCost={setCost}
          costSuccess={costSuccess}
          costError={costError}
          user={user}
        />

        <BannedCost></BannedCost>
      </CostsWrapper>

      <BannedControl>
        <SongsToBanWrapper>
          <SongsToBan setFullBannedSong={setFullBannedSong} />
        </SongsToBanWrapper>

        <BannedSongs
          fullBannedSong={fullBannedSong}
          setFullBannedSong={setFullBannedSong}
        />
      </BannedControl>

      <Snackbar
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
      </Snackbar>
    </ConfigWrapper>
  );
};

export default Config;
