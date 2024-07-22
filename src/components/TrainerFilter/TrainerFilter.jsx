import PriceSlider from "../Slider/PriceSlider";
import { useState, useCallback, useRef } from "react";
import "./TrainerFilter.css";

export const TrainerFilter = ({
  onPriceFilterChange,
  onSportFilterChange,
  onLevelFilterChange,
  sports,
  levels,
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
  const [selectedAvailability, setSelectedAvailability] = useState(
    "Select Availability"
  );
  const [selectedSort, setSelectedSort] = useState("Select Sort Option");

  const logTimeoutRef = useRef(null);

  const toggleDropdown = (key) => {
    setDropdowns((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handlePriceRangeChange = useCallback(
    (range) => {
      setPriceRange(range);

      if (logTimeoutRef.current) {
        clearTimeout(logTimeoutRef.current);
      }

      logTimeoutRef.current = setTimeout(() => {
        console.log("Price range:", range);
        onPriceFilterChange(range); // Call the filter function after timeout
      }, 1000);
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

  const handleAvailabilityChange = (availability) => {
    setSelectedAvailability(availability);
  };

  const handleSortChange = (sortOption) => {
    setSelectedSort(sortOption);
  };

  return (
    <section className="filter-container">
      <div className="filter" onClick={() => toggleDropdown("learn")}>
        <label>
          <span>Sport</span>
          <span className="bolded">
            <strong>{selectedSport}</strong>
          </span>
          {dropdowns.learn && (
            <div className="dropdown-content scrollable">
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
      <div className="filter" onClick={() => toggleDropdown("price")}>
        <label>
          <span>Price per lesson</span>
          <span className="bolded">
            <strong>
              ₪{priceRange.min} - ₪{priceRange.max}
            </strong>
          </span>
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
        </label>
      </div>
      <div className="filter" onClick={() => toggleDropdown("country")}>
        <label>
          <span>Level</span>
          <span className="bolded">
            <strong>{selectedLevel}</strong>
          </span>
          {dropdowns.country && (
            <div className="dropdown-content scrollable">
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
          <span>I&apos;m available</span>
          <span className="bolded">
            <strong>{selectedAvailability}</strong>
          </span>
          {dropdowns.available && (
            <div className="dropdown-content">
              <a href="#" onClick={() => handleAvailabilityChange("Morning")}>
                Morning
              </a>
              <a href="#" onClick={() => handleAvailabilityChange("Afternoon")}>
                Afternoon
              </a>
              <a href="#" onClick={() => handleAvailabilityChange("Evening")}>
                Evening
              </a>
            </div>
          )}
        </label>
      </div>
      <div className="filter" onClick={() => toggleDropdown("sort")}>
        <label>
          <span>Sort by</span>
          <span className="bolded">
            <strong>{selectedSort}</strong>
          </span>
          {dropdowns.sort && (
            <div className="dropdown-content">
              <a href="#" onClick={() => handleSortChange("Top picks")}>
                Top picks
              </a>
              <a href="#" onClick={() => handleSortChange("Ratings")}>
                Ratings
              </a>
              <a href="#" onClick={() => handleSortChange("Price")}>
                Price
              </a>
            </div>
          )}
        </label>
      </div>
    </section>
  );
};
