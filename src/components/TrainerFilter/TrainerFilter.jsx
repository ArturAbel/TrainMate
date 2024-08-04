import { useState, useCallback, useRef, useEffect } from "react";
import PriceSlider from "../Slider/PriceSlider";
import { useSelector } from "react-redux";

import "./css/TrainerFilter.css";
import "./css/TrainerFilter.tablet.css";
import "./css/TrainerFilter.phone.css";

export const TrainerFilter = ({
  onLessonLengthFilterChange,
  onAddressFilterChange,
  onPriceFilterChange,
  onSportFilterChange,
  onLevelFilterChange,
  toggleOverlay,
  lessonLengths,
  addresses,
  levels,
  sports,
}) => {
  const [dropdowns, setDropdowns] = useState({
    available: false,
    country: false,
    price: false,
    learn: false,
    sort: false,
  });
  const { answers } = useSelector((state) => state.quiz);
  const [priceRange, setPriceRange] = useState({ min: 5, max: 100 });
  const [selectedSport, setSelectedSport] = useState("Select Sport");
  const [selectedLevel, setSelectedLevel] = useState("Select Level");
  const [selectedAddress, setSelectedAddress] = useState("Select Address");
  const [selectedLessonLength, setSelectedLessonLength] =
    useState("Select Duration");

  const logTimeoutRef = useRef(null);
  const filterRef = useRef(null);

  const toggleDropdown = (key) => {
    setDropdowns((prev) => {
      const newState = { ...prev, [key]: !prev[key] };
      toggleOverlay(Object.values(newState).some((value) => value));
      return newState;
    });
  };

  const closeDropdowns = () => {
    setDropdowns({
      available: false,
      country: false,
      price: false,
      learn: false,
      sort: false,
    });
    toggleOverlay(false);
  };

  const handleClickOutside = (event) => {
    if (filterRef.current && !filterRef.current.contains(event.target)) {
      closeDropdowns();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const initializeFilters = () => {
      if (answers) {
        setSelectedSport(answers[0] || "Select Sport");
        setSelectedLevel(answers[1] || "Select Level");
        setSelectedAddress(answers[2] || "Select Address");
        setPriceRange({ min: 5, max: answers[3] || 100 });
      }
    };
    initializeFilters();
  }, [answers]);

  const handlePriceRangeChange = useCallback(
    (range) => {
      setPriceRange(range);

      if (logTimeoutRef.current) {
        clearTimeout(logTimeoutRef.current);
      }

      logTimeoutRef.current = setTimeout(() => {
        onPriceFilterChange(range);
      }, 1000);
    },
    [onPriceFilterChange]
  );

  const handleSportFilterChange = (sport) => {
    setSelectedSport(sport);
    onSportFilterChange(sport);
    if (sport === null) {
      setSelectedSport("Select Sport");
    }
  };

  const handleLevelFilterChange = (level) => {
    setSelectedLevel(level);
    onLevelFilterChange(level);
    if (level === null) {
      setSelectedLevel("Select Level");
    }
  };

  const handleAddressFilterChange = (address) => {
    setSelectedAddress(address);
    onAddressFilterChange(address);
    if (address === null) {
      setSelectedAddress("Select Address");
    }
  };

  const handleLessonLengthFilterChange = (lessonLength) => {
    setSelectedLessonLength(lessonLength);
    onLessonLengthFilterChange(lessonLength);
    if (lessonLength === null) {
      setSelectedLessonLength("Select Duration");
    }
  };

  const uniqueLessonLengths = [...new Set(lessonLengths.sort((a, b) => a - b))];
  const uniqueAddresses = [...new Set(addresses.sort())];
  const uniqueLevels = [...new Set(levels.flat())];
  const uniqueSports = [...new Set(sports.sort())];

  return (
    <section
      className="filter-container filter-overlay-content"
      ref={filterRef}
    >
      <div className="filter" onClick={() => toggleDropdown("learn")}>
        <label className="filter-container-label">
          <span className="filter-container-label-upper">
            I want to train in
          </span>
          <span className="filter-container-inner-lower">{selectedSport}</span>
          {dropdowns.learn && (
            <div className="dropdown-content scrollable">
              <a href="#" onClick={() => handleSportFilterChange(null)}>
                All
              </a>
              {uniqueSports.map((sport, index) => (
                <a
                  key={index}
                  href="#"
                  onClick={() => handleSportFilterChange(sport)}
                >
                  {sport}
                </a>
              ))}
            </div>
          )}
        </label>
      </div>
      <div className="filter">
        <label
          className="filter-container-label"
          onClick={() => toggleDropdown("price")}
        >
          <span className="filter-container-label-upper">Price per lesson</span>
          <span className="filter-container-inner-lower">
            ₪{priceRange.min} - ₪{priceRange.max}
          </span>
        </label>
        {dropdowns.price && (
          <div className="dropdown-content">
            <PriceSlider
              onRangeChange={handlePriceRangeChange}
              initialMinValue={priceRange.min}
              initialMaxValue={priceRange.max}
              max={100}
              min={5}
            />
          </div>
        )}
      </div>
      <div className="filter" onClick={() => toggleDropdown("level")}>
        <label className="filter-container-label">
          <span className="filter-container-label-upper">Level</span>
          <span className="filter-container-inner-lower">{selectedLevel}</span>
          {dropdowns.level && (
            <div className="dropdown-content scrollable">
              <a href="#" onClick={() => handleLevelFilterChange(null)}>
                All
              </a>
              {uniqueLevels.map((level, index) => (
                <a
                  key={index}
                  href="#"
                  onClick={() => handleLevelFilterChange(level)}
                >
                  {level}
                </a>
              ))}
            </div>
          )}
        </label>
      </div>
      <div className="filter" onClick={() => toggleDropdown("available")}>
        <label className="filter-container-label">
          <span className="filter-container-label-upper">Address</span>
          <span className="filter-container-inner-lower">
            {selectedAddress}
          </span>
          {dropdowns.available && (
            <div className="dropdown-content scrollable">
              <a href="#" onClick={() => handleAddressFilterChange(null)}>
                All
              </a>
              {uniqueAddresses.map((address, index) => (
                <a
                  key={index}
                  href="#"
                  onClick={() => handleAddressFilterChange(address)}
                >
                  {address}
                </a>
              ))}
            </div>
          )}
        </label>
      </div>
      <div className="filter" onClick={() => toggleDropdown("sort")}>
        <label className="filter-container-label">
          <span className="filter-container-label-upper">Session duration</span>
          <span className="filter-container-inner-lower">
            {selectedLessonLength}
          </span>
          {dropdowns.sort && (
            <div className="dropdown-content scrollable">
              <a href="#" onClick={() => handleLessonLengthFilterChange(null)}>
                All
              </a>
              {uniqueLessonLengths.map((length, index) => (
                <a
                  key={index}
                  href="#"
                  onClick={() => handleLessonLengthFilterChange(length)}
                >
                  {length}
                </a>
              ))}
            </div>
          )}
        </label>
      </div>
    </section>
  );
};
export default TrainerFilter;
