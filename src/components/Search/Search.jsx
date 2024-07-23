// components/Search/Search.jsx
import React from "react";
import "./Search.css";

const Search = ({ onSearch }) => {
  const handleSearch = (event) => {
    if (event.key === "Enter") {
      onSearch(event.target.value);
    }
  };

  return (
    <div className="search-container">
      <input
        type="text"
        className="search-input"
        placeholder="Search trainer by name"
        onKeyDown={handleSearch}
      />
    </div>
  );
};

export default Search;
