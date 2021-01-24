import React from "react";
import { deleteReward } from "./TwitchApi";


const RewardsList = ({ rewards, onDelete }) => {
  return (
    <div>
      {rewards.map((reward) => (
        <div key={reward.id}>
          <div>{reward.title}</div>
          <div>tickets: {reward.tickets}</div>
          <button onClick={() => deleteReward(reward.id, onDelete)}>
            delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default RewardsList;
