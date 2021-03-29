import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Button from "./Button";
import { ConfigWrapper } from "./Config.styled";
import { setExtremeCost, getExtremeCost } from "./TwitchApi";

const Config = ({ user }) => {
  useEffect(() => {
    getExtremeCost({ broadcasterId: user.id })
      .then((response) => response.json())
      .then((data) => setCost(data))
      .catch((err) => {
        setCostError(true);
        console.log(err);
      });
  }, []);

  const useStyles = makeStyles((theme) => ({
    form: {
      width: `calc(25ch + ${theme.spacing(1)}px * 2)`,
      display: "inline-flex",
      justifyContent: "center",
      flexWrap: "wrap",
      "& > *": {
        margin: theme.spacing(1),
        width: "25ch",
      },
    },
  }));
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
  const classes = useStyles();

  const [cost, setCost] = useState(5);
  const [costError, setCostError] = useState(false);
  const [costSuccess, setCostSuccess] = useState(false);

  const handleCost = (e) => {
    e.preventDefault();
    setExtremeCost(
      { broadcasterId: user.id, cost },
      setCostSuccess,
      setCostError
    );
  };

  return (
    <ConfigWrapper>
      <form className={classes.form}>
        <TextField
          id="reward-title"
          label="Extreme cost"
          type="number"
          value={cost}
          onChange={(e) => setCost(e.target.value)}
          variant="outlined"
        />

        <Button
          onClick={handleCost}
          variant="contained"
          color="#fff"
          type="submit"
        >
          Update
        </Button>
      </form>
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
