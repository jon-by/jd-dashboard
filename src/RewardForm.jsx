import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import { updateReward, createReward } from "./TwitchApi";
import "./RewardForm.css";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Spinner from "./Spinner";

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

const RewardForm = ({ onSave, reward, onClose }) => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState(
    reward?.title.slice(
      0,
      reward?.title.indexOf(` (${reward?.tickets} Tickets)`)
    ) || ""
  );
  const [cost, setCost] = useState(reward?.cost || 100);
  const [tickets, setTickets] = useState(reward?.tickets || 1);
  const handleSave = (payload, type) => {
    setLoading(false);
    onSave(payload, type);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const newTitle = `${title} (${tickets} Tickets)`;
    if (reward?.id) {
      const newObj = {};
      const rewardState = { title, cost, tickets };

      const keys = Object.keys(rewardState);

      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        if (reward[key] !== rewardState[key]) {
          newObj[key] = key === "title" ? newTitle : rewardState[key];
        }
      }
      if (Object.keys(newObj).length > 0) {
        updateReward({ id: reward.id, ...newObj }, handleSave);
      } else {
        onClose();
      }
    } else {
      createReward({ title: newTitle, cost, tickets }, handleSave);
    }
  };
  return (
    <form className={classes.form} onSubmit={onSubmit}>
      {loading && <Spinner />}
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
        {reward?.id ? "Editar" : "Cadastrar"}
      </Button>
    </form>
  );
};

export default RewardForm;
