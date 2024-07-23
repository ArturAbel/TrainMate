// components/Search/Search.jsx
import React, { useState, useRef } from "react";
import "./Search.css";

const Search = ({
  onSearch,
  onVailerChange,
  toggleOverlay,
  onSortByRating,
}) => {
  const [query, setQuery] = useState("");
  const [vailer, setVailer] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const debounceTimeout = useRef(null);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setQuery(value);

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      onSearch(value);
      toggleOverlay(value !== "");
    }, 1000);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
      onSearch(query);
      toggleOverlay(query !== "");
    }
  };

  const handleFocus = () => {
    toggleOverlay(true);
  };

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
    toggleOverlay(!dropdownOpen);
  };

  const handleSortByRating = () => {
    setVailer("sort by best rating");
    onSortByRating();
    toggleOverlay(false);
    setDropdownOpen(false);
  };

  return (
    <div className="search-container filter-overlay-content">
      <input
        type="text"
        className="search-input"
        placeholder="Search trainer by name"
        value={query}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
      />
      <div
        className="vailer-dropdown vailer-container"
        onClick={toggleDropdown}
      >
        <div className="vailer-select">
          {vailer || "sort by "}
          <span className="dropdown-arrow">&#9662;</span>
        </div>
        {dropdownOpen && (
          <div className="dropdown-content scrollable">
            <a href="#" onClick={handleSortByRating}>
              sort by best rating
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
