import React, { useState } from "react";
import PriceSlider from "../../components/Slider/PriceSlider"; // Adjust the path as needed
import Card from "../../components/Trainer-card/card"; // Adjust the path as needed
import "./Trainers.css";

const Trainers = () => {
  const [dropdowns, setDropdowns] = useState({
    learn: false,
    price: false,
    country: false,
    available: false,
    sort: false,
  });

  const [priceRange, setPriceRange] = useState({ min: 5, max: 100 });

  const toggleDropdown = (key) => {
    setDropdowns((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handlePriceRangeChange = (range) => {
    setPriceRange(range);
  };

  return (
    <div className="container">
      <header>
        <h1>Online English tutors & teachers for private lessons</h1>
      </header>
      <section className="filter-container">
        <div className="filter" onClick={() => toggleDropdown("learn")}>
          <label>
            <span>I want to learn</span>
            <span className="bolded">
              <strong>Bolded</strong>
            </span>
            {dropdowns.learn && (
              <div className="dropdown-content">
                <a href="#">English</a>
                <a href="#">Math</a>
                <a href="#">Science</a>
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
            <span>Country of birth</span>
            <span className="bolded">
              <strong>Bolded</strong>
            </span>
            {dropdowns.country && (
              <div className="dropdown-content">
                <a href="#">USA</a>
                <a href="#">Canada</a>
                <a href="#">UK</a>
              </div>
            )}
          </label>
        </div>
        <div className="filter" onClick={() => toggleDropdown("available")}>
          <label>
            <span>I'm available</span>
            <span className="bolded">
              <strong>Bolded</strong>
            </span>
            {dropdowns.available && (
              <div className="dropdown-content">
                <a href="#">Morning</a>
                <a href="#">Afternoon</a>
                <a href="#">Evening</a>
              </div>
            )}
          </label>
        </div>
        <div className="filter" onClick={() => toggleDropdown("sort")}>
          <label>
            <span>Sort by</span>
            <span className="bolded">
              <strong>Bolded</strong>
            </span>
            {dropdowns.sort && (
              <div className="dropdown-content">
                <a href="#">Top picks</a>
                <a href="#">Ratings</a>
                <a href="#">Price</a>
              </div>
            )}
          </label>
        </div>
      </section>
      <section className="team-container">
        <Card
          imgSrc="trainer-photo.jpg"
          name="Trainer Name"
          expertise="English"
          experience="5 years"
          reviews="4.5"
          price="50"
        />
        {/* Add more Card components as needed */}
      </section>
    </div>
  );
};

export default Trainers;
