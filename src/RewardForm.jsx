import React, {useState} from "react";
import {updateReward, createReward} from "./TwitchApi";
import "./RewardForm.css";


const RewardForm = ({ data }) => {
  const [title, setTitle] = useState(data?.title || '');
  const [cost, setCost] = useState(data?.cost || 100);
  const [tickets, setTickets] = useState(data?.tickets || 1);
  const onSubmit = e => {
    e.preventDefault()
    if (data?.id) {
      updateReward({title, cost, tickets});
    } else {
      createReward({title, cost, tickets});
    }
  }
  return (
    <div classtitle="create-reward">
      <form classtitle="create-reward-form" onSubmit={onSubmit}>
        Create reward
        <label htmlFor="reward-title">
          Reward title:
          <input type="text" onChange={e => setTitle(e.target.value)} value={title} id="reward-title" />
        </label>
        <label htmlFor="reward-cost">
          Reward cost:
          <input type="number" onChange={e => setCost(e.target.value)} value={cost} id="reward-Price" />
        </label>
        <label htmlFor="tickets-number">
          Número de Tickets
          <input type="number" onChange={e => setTickets(e.target.value)} value={tickets} id="tickets-number" />
        </label>
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
};

export default RewardForm;
