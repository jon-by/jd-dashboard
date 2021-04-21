import React, { useState } from "react";
import { LIST_STATUS } from "./constants";
import Toggle from "./Toggle";
import { StatusWrapper, StatusToggle } from "./ListStatus.styled";
import Button from "./Button";
import { COLORS } from "./constants";

const ListStatus = ({ songListStatus, changeListStatus, deleteList }) => {
  const handleChangeStatus = (value) => {
    changeListStatus(value ? LIST_STATUS.ACTIVE : LIST_STATUS.PAUSED);
  };
  return (
    <div>
      <StatusWrapper>
        <StatusToggle>
          Status: {songListStatus}&nbsp;
          <Toggle
            value={songListStatus === LIST_STATUS.ACTIVE}
            onChange={handleChangeStatus}
          />
        </StatusToggle>
        <Button onClick={() => deleteList()} bgColor={COLORS.PURPLE}>
          Close List
        </Button>
      </StatusWrapper>
    </div>
  );
};

export default ListStatus;
