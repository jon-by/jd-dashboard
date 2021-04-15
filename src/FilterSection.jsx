import React, { useState } from "react";

import { Filter } from "./FilterSection.styled";

const FilterSection = ({ value, onChange }) => {
  return (
    <Filter>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search"
      />
    </Filter>
  );
};

export default FilterSection;
