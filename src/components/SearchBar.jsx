import React from "react";

const SearchBar = ({ value, onChange }) => (
  <input
    type="text"
    placeholder="جستجو"
    value={value}
    onChange={(e) => onChange(e.target.value)}
    className="search-bar"
  />
);

export default SearchBar;