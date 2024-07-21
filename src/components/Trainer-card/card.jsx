import React from "react";
import "./card.css";

const Card = () => {
  return (
    <div className="card">
      <div className="card-header">
        <h1>Avi</h1>
        <img src="https://i.imgur.com/rYTB1zu.jpg" alt="Trainer" />
      </div>
      <div className="card-details">
        <p className="sport">
          <strong>Sport:</strong> Basketball
        </p>
        <p className="level">Level: Intermediate</p>
        <p className="location">
          <strong>Location:</strong> New York
        </p>
      </div>
      <div className="card-description">
        <p>description</p>
        <p>
          This is the second part of the description. It provides additional
          information about the card content.
        </p>
        <p>
          This is the third part of the description. It provides even more
          details about the card content.
        </p>
      </div>
      <div className="card-reviews-price">
        <div className="reviews">5★</div>
        <div className="price">₪90</div>
      </div>
      <div className="card-footer">
        <button>Book a Session Now!</button>
      </div>
    </div>
  );
};

export default Card;
