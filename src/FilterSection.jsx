import React from "react";
import TicketIcon from "./TicketIcon";
import { Header, Title, Filter } from "./FilterSection.styled";

const FilterSection = ({ tickets, value, onChange }) => {
  return (
    <Header>
      <Title>
        <span>Just Dance Trackllist </span>
        <span>
          {tickets}
          <TicketIcon color="#fff" size="12" />
        </span>
      </Title>
      <Filter>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search"
        />
        {/* <select onChange={(e) => console.log(e)} value={undefined}>
          <option value={option}>{option.text}</option>
        </select> */}
      </Filter>
    </Header>
  );
};

export default FilterSection;
