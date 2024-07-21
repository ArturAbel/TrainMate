import React, { useState, useRef, useEffect } from "react";
import "./PriceSlider.css";

const PriceSlider = ({
  min,
  max,
  initialMinValue,
  initialMaxValue,
  onRangeChange,
}) => {
  const [minValue, setMinValue] = useState(initialMinValue);
  const [maxValue, setMaxValue] = useState(initialMaxValue);

  const rangeRef = useRef(null);
  const minValueRef = useRef(null);
  const maxValueRef = useRef(null);

  const handleMinValueChange = (e) => {
    const value = Math.min(e.target.value, maxValue - 1);
    setMinValue(value);
    e.target.value = value.toString();
  };

  const handleMaxValueChange = (e) => {
    const value = Math.max(e.target.value, minValue + 1);
    setMaxValue(value);
    e.target.value = value.toString();
  };

  useEffect(() => {
    if (rangeRef.current) {
      const percentMin = ((minValue - min) / (max - min)) * 100;
      const percentMax = ((maxValue - min) / (max - min)) * 100;
      minValueRef.current.style.left = `${percentMin}%`;
      maxValueRef.current.style.left = `${percentMax}%`;
      rangeRef.current.style.left = `${percentMin}%`;
      rangeRef.current.style.width = `${percentMax - percentMin}%`;
    }

    onRangeChange({ min: minValue, max: maxValue });
  }, [minValue, maxValue, min, max, onRangeChange]);

  return (
    <div className="price-slider">
      <input
        type="range"
        min={min}
        max={max}
        value={minValue}
        onChange={handleMinValueChange}
        className="thumb thumb--left"
        style={{ zIndex: minValue > max - 100 && "5" }}
      />
      <input
        type="range"
        min={min}
        max={max}
        value={maxValue}
        onChange={handleMaxValueChange}
        className="thumb thumb--right"
      />

      <div className="slider">
        <div className="slider__track"></div>
        <div ref={rangeRef} className="slider__range"></div>
        <div ref={minValueRef} className="slider__left-value">
          {minValue}
        </div>
        <div ref={maxValueRef} className="slider__right-value">
          {maxValue}
        </div>
      </div>
    </div>
  );
};

export default PriceSlider;
