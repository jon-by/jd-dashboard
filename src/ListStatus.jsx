import React, { useState } from "react";
import { STATUS } from "./constants";
import Toggle from "./Toggle";
import { StatusWrapper } from "./ListStatus.styled";
import Button from "./Button";
import { COLORS } from "./constants";
const ListStatus = ({ songListStatus, onChange }) => {
  const [value, setValue] = useState(false);
  const handleChangeStatus = (value) => {
    console.log("toggle");
    onChange(value ? STATUS.active : STATUS.paused);
  };
  return (
    <div>
      <StatusWrapper>
        Status:{songListStatus}
        <Toggle
          value={songListStatus === STATUS.active}
          onChange={handleChangeStatus}
        />
        <Button bgColor={COLORS.PURPLE}>Close List</Button>
      </StatusWrapper>
    </div>
  );
};

export default ListStatus;
