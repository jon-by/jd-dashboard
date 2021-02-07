import React, { useState } from "react";
import { STATUS } from "./constants";
import Toggle from "./Toggle";

const ListStatus = ({ songListStatus, onChange }) => {
  const [value, setValue] = useState(false);
  const handleChangeStatus = (value) => {
    console.log("toggle");
    onChange(value ? STATUS.active : STATUS.paused);
  };
  return (
    <div>
      <div>Status: {songListStatus}</div>
      <Toggle
        value={songListStatus === STATUS.active}
        onChange={handleChangeStatus}
      />
    </div>
  );
};

export default ListStatus;
