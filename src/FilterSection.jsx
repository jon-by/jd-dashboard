import React, { useState } from "react";

import { Filter } from "./FilterSection.styled";

const FilterSection = ({ value, setSearchTerm }) => {
  return (
    <Filter>
      <input
        type="text"
        value={value}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search"
      />
    </Filter>
  );
};

export default FilterSection;
