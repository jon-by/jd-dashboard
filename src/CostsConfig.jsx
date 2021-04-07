import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

import Button from "./Button";
import { CostWrapper } from "./CostsConfig.styled";

const CostsConfig = ({ cost, setCost, children }) => {
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

  const classes = useStyles();

  return (
    <CostWrapper>
      <form className={classes.form}>
        <TextField
          id="reward-title"
          label={children}
          type="number"
          value={cost}
          onChange={setCost}
          variant="outlined"
        />
      </form>
    </CostWrapper>
  );
};

export default CostsConfig;
