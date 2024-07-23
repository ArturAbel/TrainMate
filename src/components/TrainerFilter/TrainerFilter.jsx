import PriceSlider from "../Slider/PriceSlider";
import { useState, useCallback, useRef, useEffect } from "react";
import "./TrainerFilter.css";

export const TrainerFilter = ({
  onPriceFilterChange,
  onSportFilterChange,
  onLevelFilterChange,
  onAddressFilterChange,
  onLessonLengthFilterChange,
  sports,
  levels,
  addresses,
  lessonLengths,
  toggleOverlay,
}) => {
  const [dropdowns, setDropdowns] = useState({
    available: false,
    country: false,
    price: false,
    learn: false,
    sort: false,
  });

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

  const handlePriceRangeChange = useCallback(
    (range) => {
      setPriceRange(range);

      if (logTimeoutRef.current) {
        clearTimeout(logTimeoutRef.current);
      }

      logTimeoutRef.current = setTimeout(() => {
        console.log("Price range:", range);
        onPriceFilterChange(range); // Call the filter function after timeout
      }, 4000);
    },
    [onPriceFilterChange]
  );

  const handleSportFilterChange = (sport) => {
    setSelectedSport(sport);
    onSportFilterChange(sport);
  };

  const handleLevelFilterChange = (level) => {
    setSelectedLevel(level);
    onLevelFilterChange(level);
  };

  const handleAddressFilterChange = (address) => {
    setSelectedAddress(address);
    onAddressFilterChange(address);
  };

  const handleLessonLengthFilterChange = (lessonLength) => {
    setSelectedLessonLength(lessonLength);
    onLessonLengthFilterChange(lessonLength);
  };

  return (
    <section
      className="filter-container filter-overlay-content"
      ref={filterRef}
    >
      <div className="filter" onClick={() => toggleDropdown("learn")}>
        <label>
          <span>Sport</span>
          <span className="bolded">
            <strong>{selectedSport}</strong>
          </span>
          {dropdowns.learn && (
            <div className="dropdown-content scrollable">
              <a href="#" onClick={() => handleSportFilterChange(null)}>
                Add All
              </a>
              {sports.map((sport, index) => (
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
        <label onClick={() => toggleDropdown("price")}>
          <span>Price per lesson</span>
          <span className="bolded">
            <strong>
              ₪{priceRange.min} - ₪{priceRange.max}
            </strong>
          </span>
        </label>
        {dropdowns.price && (
          <div className="dropdown-content">
            <PriceSlider
              min={5}
              max={100}
              initialMinValue={priceRange.min}
              initialMaxValue={priceRange.max}
              onRangeChange={handlePriceRangeChange}
            />
          </div>
        )}
      </div>
      <div className="filter" onClick={() => toggleDropdown("level")}>
        <label>
          <span>Level</span>
          <span className="bolded">
            <strong>{selectedLevel}</strong>
          </span>
          {dropdowns.level && (
            <div className="dropdown-content scrollable">
              <a href="#" onClick={() => handleLevelFilterChange(null)}>
                Add All
              </a>
              {levels.map((level, index) => (
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
        <label>
          <span>Address</span>
          <span className="bolded">
            <strong>{selectedAddress}</strong>
          </span>
          {dropdowns.available && (
            <div className="overlay-filter">
              <div className="dropdown-content scrollable">
                <a href="#" onClick={() => handleAddressFilterChange(null)}>
                  Add All
                </a>
                {addresses.map((address, index) => (
                  <a
                    key={index}
                    href="#"
                    onClick={() => handleAddressFilterChange(address)}
                  >
                    {address}
                  </a>
                ))}
              </div>
            </div>
          )}
        </label>
      </div>
      <div className="filter" onClick={() => toggleDropdown("sort")}>
        <label>
          <span>Session duration</span>
          <span className="bolded">
            <strong>{selectedLessonLength}</strong>
          </span>
          {dropdowns.sort && (
            <div className="overlay-filter">
              <div className="dropdown-content scrollable">
                <a
                  href="#"
                  onClick={() => handleLessonLengthFilterChange(null)}
                >
                  Add All
                </a>
                {lessonLengths.map((length, index) => (
                  <a
                    key={index}
                    href="#"
                    onClick={() => handleLessonLengthFilterChange(length)}
                  >
                    {length}
                  </a>
                ))}
              </div>
            </div>
          )}
        </label>
      </div>
    </section>
  );
};
