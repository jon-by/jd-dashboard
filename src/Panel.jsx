import React, { useEffect, useReducer } from "react";
import { reducer, initialState } from "./RewardsReducer";
import { getAllRewards } from "./TwitchApi";
import RewardForm from "./RewardForm";
import RewardsList from "./RewardsList";

const Panel = () => {
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
  return !state.error ? (
    <div>
      <RewardForm onSave={data => dispatch({type: 'createReward', payload: data})}/>
      <RewardsList rewards={state.rewards} onDelete={id => dispatch({type: 'deleteReward', payload: id})} />
    </div>
  ) : (
    <div>{state.error.message}</div>
  );
};

export default Panel;
