import React from "react";
import Style from "styled-components";
import RewardControl from "./RewardControl";
import editReward from "./TwitchApi";

export const rewardControlOptins = {
  edit: "edit",
  delete: "delete",
  playPause: "playPause",
  stop: "stop",
};

const StyledDiv = Style.div`
  display:flex;
`;

const RewardListControlPanel = ({ rewardId }) => {
  return (
    <div>
      <RewardControl
        controlOption={rewardControlOptins.edit}
        onClick={(e) => console.log(e)}
      />
      <RewardControl
        controlOption={rewardControlOptins.playPause}
        onClick={(e) => console.log(e)}
      />
      <RewardControl
        controlOption={rewardControlOptins.stop}
        onClick={(e) => console.log(e)}
      />
      <RewardControl
        controlOption={rewardControlOptins.delete}
        onClick={(e) => console.log(e)}
      />
    </div>
  );
};

export default RewardListControlPanel;
