import React from "react";

import { ListStatus } from "./OverlayListStatus.styled";

const OverlayListStatus = ({ listStatus }) => {
  return <ListStatus>List {listStatus}</ListStatus>;
};

export default OverlayListStatus;
