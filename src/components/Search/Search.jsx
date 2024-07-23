import { IoSearch } from "react-icons/io5";
import { useState, useRef } from "react";

import "./Search.css";

const Search = ({ onSearch, toggleOverlay, onSortByRating }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [vailer, setVailer] = useState("");
  const [query, setQuery] = useState("");
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

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
    toggleOverlay(!dropdownOpen);
  };

  const handleSortByRating = () => {
    setVailer("sort by best rating");
    onSortByRating();
    setDropdownOpen(false);
    toggleOverlay(false);
  };

  return (
    <div className="search-container">
      <div
        className="vailer-dropdown vailer-container"
        onClick={toggleDropdown}
      >
        <div className="vailer-select">
          {vailer || "sort by "}
          <span className="dropdown-arrow">&#9662;</span>
        </div>
        {dropdownOpen && (
          <div className="vailer-dropdown-content scrollable">
            <a href="#" onClick={handleSortByRating}>
              sort by best rating
            </a>
          </div>
        )}
      </div>
      <div className="search-trainer-container">
        <IoSearch className="search-trainer-icon" />
        <input
          placeholder={"Search trainer by name"}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className="search-input"
          value={query}
          type="text"
        />
      </div>
    </div>
  );
};

export default Search;
