import React from "react";
import Edit from "@material-ui/icons/BorderColor";
import Play from "@material-ui/icons/PlayCircleFilled";
import Stop from "@material-ui/icons/Stop";
import Delete from "@material-ui/icons/Delete";
import { rewardControlOptins } from "./RewardListControlPanel";

const RewardControl = ({ controlOption, onClick }) => {
  switch (controlOption) {
    case rewardControlOptins.edit:
      return <Edit onClick={onClick} />;

    case rewardControlOptins.playPause:
      return <Play onClick={onClick} />;

    case rewardControlOptins.stop:
      return <Stop onClick={onClick} />;

    case rewardControlOptins.delete:
      return <Delete onClick={onClick} />;

    default:
      return false;
  }
};

export default RewardControl;
