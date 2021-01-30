import React from "react";
import Style from "styled-components";
import { lighten, rgba } from "polished";
import { deleteReward } from "./TwitchApi";
import Button, { btnVariants } from "./Button";
import RewardListControlPanel from "./RewardListControlPanel";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Tooltip from "@material-ui/core/Tooltip";

import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import PlayIcon from "@material-ui/icons/PlayCircleFilled";
import PauseIcon from "@material-ui/icons/PauseCircleFilled";
import DeleteIcon from "@material-ui/icons/Delete";
import Divider from "@material-ui/core/Divider";

//import { COLORS } from "./constants";

const RewardsList = ({ rewards, onDelete, onEdit }) => {
  return (
    <div>
      <List>
        <Divider />
        {rewards.map((reward) => (
          <>
            <ListItem key={reward.id}>
              <ListItemText
                primary={reward.title}
                secondary={`tickets: ${reward.tickets}`}
              />
              <ListItemSecondaryAction>
                <Tooltip title="Edit">
                  <IconButton
                    edge="end"
                    aria-label="edit"
                    alt="edit"
                    onClick={() => onEdit(reward)}
                  >
                    <EditIcon />
                  </IconButton>
                </Tooltip>

                <Tooltip title="Play/Pause">
                  <IconButton edge="end" aria-label="play-pause">
                    <PlayIcon />
                  </IconButton>
                </Tooltip>

                <Tooltip title="Delete">
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => deleteReward(reward.id, onDelete)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </ListItemSecondaryAction>
            </ListItem>
            <Divider />
          </>
        ))}
      </List>
    </div>
  );
};

export default RewardsList;
