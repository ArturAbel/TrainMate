import React from "react";
import "./card.css";

const Card = ({
  name,
  imgSrc,
  sport,
  level,
  location,
  description,
  reviews,
  price,
}) => {
  return (
    <div className="card">
      <div className="card-header">
        <h1>{name}</h1>
        <img src={imgSrc} alt="Trainer" />
      </div>
      <div className="card-details">
        <p className="sport">
          <strong>Sport:</strong> {sport}
        </p>
        <p className="level">
          <strong>Level:</strong> {level}
        </p>
        <p className="location">
          <strong>Location:</strong> {location}
        </p>
      </div>
      <div className="card-description">
        <p>{description}</p>
      </div>
      <div className="card-reviews-price">
        <div className="reviews">{reviews}★</div>
        <div className="price">₪{price}</div>
      </div>
      <div className="card-footer">
        <button>Book a Session Now!</button>
      </div>
    </div>
  );
};

export default Card;
