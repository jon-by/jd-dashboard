import React, { useState } from "react";
import { STATUS } from "./constants";
import Toggle from "./Toggle";
import { StatusWrapper, StatusToggle } from "./ListStatus.styled";
import Button from "./Button";
import { COLORS } from "./constants";

const ListStatus = ({ songListStatus, onChange, changeListStatus }) => {
  const handleChangeStatus = (value) => {
    changeListStatus(value ? STATUS.active : STATUS.paused);
  };
  return (
    <div>
      <StatusWrapper>
        <StatusToggle>
          Status: {songListStatus}&nbsp;
          <Toggle
            value={songListStatus === STATUS.active}
            onChange={handleChangeStatus}
          />
        </StatusToggle>
        <Button bgColor={COLORS.PURPLE}>Close List</Button>
      </StatusWrapper>
    </div>
  );
};

export default ListStatus;
