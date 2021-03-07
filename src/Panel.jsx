import React, { useEffect, useReducer } from "react";
import Tooltip from "@material-ui/core/Tooltip";
import { reducer, initialState } from "./RewardsReducer";
import { makeStyles } from "@material-ui/core/styles";
import { getAllRewards } from "./TwitchApi";
import RewardForm from "./RewardForm";
import RewardsList from "./RewardsList";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Spinner from "./Spinner";

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
    dispatch({ type: "setLoading", payload: true });
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
  if (state.error) {
    return state.error.message;
  }
  if (state.loading) {
    return <Spinner />;
  }
  return (
    <div>
      <Dialog
        open={state.isEditModalOpen}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Custom Reward</DialogTitle>
        <DialogContent>
          <RewardForm
            onSave={(payload, type) => dispatch({ type, payload })}
            reward={state.editingReward}
            onClose={handleClose}
          />
        </DialogContent>
      </Dialog>

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
  );
};

export default Panel;
