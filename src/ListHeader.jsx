import React from "react";
import { Header, Title } from "./ListHeader.styled";
import TicketIcon from "./TicketIcon";

const ListHeader = ({ tickets }) => {
  return (
    <Header>
      <Title>
        <span>Just Dance Trackllist </span>
        <span>
          {tickets}
          <TicketIcon color="#fff" size="12" />
        </span>
      </Title>
    </Header>
  );
};

export default ListHeader;
