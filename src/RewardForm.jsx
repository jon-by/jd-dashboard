import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import { updateReward, createReward } from "./TwitchApi";
import "./RewardForm.css";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "20px",
  },
  form: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

const RewardForm = ({ onSave, reward }) => {
  const classes = useStyles();
  const [title, setTitle] = useState(reward?.title || "");
  const [cost, setCost] = useState(reward?.cost || 100);
  const [tickets, setTickets] = useState(reward?.tickets || 1);
  const onSubmit = (e) => {
    e.preventDefault();
    if (reward?.id) {
      updateReward({ id: reward.id, title, cost, tickets }, onSave);
    } else {
      createReward({ title, cost, tickets }, onSave);
    }
  };
  return (
    <Paper className={classes.root}>
      <form className={classes.form} onSubmit={onSubmit}>
        <TextField
          id="rewalrd-tite"
          label="Reward title:"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          variant="outlined"
        />
        <TextField
          label="Reward cost:"
          type="number"
          onChange={(e) => setCost(e.target.value)}
          value={cost}
          id="reward-Price"
          variant="outlined"
        />
        <TextField
          label="Tickets amount:"
          type="number"
          onChange={(e) => setTickets(e.target.value)}
          value={tickets}
          id="tickets-number"
          variant="outlined"
        />
        <Button type="submit" variant="contained" color="primary" type="submit">
          Cadastrar
        </Button>
      </form>
    </Paper>
  );
};

export default RewardForm;
