// src/components/FilterOverlay/FilterOverlay.js
import "./FilterOverlay.css";

const FilterOverlay = ({ isVisible, onClose, children }) => {
  if (!isVisible) return null;

  return (
    <div className="filter-overlay" onClick={onClose}>
      <div
        className="filter-overlay-content"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default FilterOverlay;
