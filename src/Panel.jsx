import React, { useEffect, useReducer } from "react";
import Tooltip from "@material-ui/core/Tooltip";
import { reducer, initialState } from "./RewardsReducer";
import { makeStyles } from "@material-ui/core/styles";
import { getAllRewards } from "./TwitchApi";
import RewardForm from "./RewardForm";
import RewardsList from "./RewardsList";
import Modal from "@material-ui/core/Modal";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import { green } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  fab: {
    position: "absolute",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

const Panel = () => {
  const classes = useStyles();
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    getAllRewards((data, error) => {
      if (error) {
        dispatch({ type: "setError", payload: error });
      } else {
        dispatch({ type: "setRewards", payload: data });
      }
    });
  }, []);

  const handleEdit = (reward) => {
    dispatch({ type: "setEditingReward", payload: reward });
  };

  const handleClose = () =>
    dispatch({ type: "setEditModalOpen", payload: false });

  const handleOpen = () =>
    dispatch({ type: "setEditModalOpen", payload: true });

  return !state.error ? (
    <div>
      <Modal
        open={state.isEditModalOpen}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <RewardForm
          onSave={(payload, type) => dispatch({ type, payload })}
          reward={state.editingReward}
          onClose={handleClose}
        />
      </Modal>
      <RewardsList
        onEdit={handleEdit}
        rewards={state.rewards}
        onDelete={(id) => dispatch({ type: "deleteReward", payload: id })}
      />
      <Tooltip title="Add Custom Reward">
        <Fab className={classes.fab} color="primary" onClick={handleOpen}>
          <AddIcon />
        </Fab>
      </Tooltip>
    </div>
  ) : (
    <div>{state.error.message}</div>
  );
};

export default Panel;
