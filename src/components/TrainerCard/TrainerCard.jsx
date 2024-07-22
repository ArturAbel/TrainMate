import "./TrainerCard.css";

const Card = () => {
  return (
    <div className="trainer-card-container">
      <div className="trainer-card-image-container">
        <img
          className="trainer-card-image"
          src="https://i.imgur.com/rYTB1zu.jpg"
          alt="image"
        />
      </div>
      <div className="trainer-card-content-container">
        <h1 className="trainer-card-name">Avi</h1>
        <p className="trainer-card-sport">basketball</p>
        <p className="trainer-card-level">intermediate</p>
        <p className="trainer-card-location">New York</p>
        <p className="trainer-card-information">
          This is the second part of the description. It provides additional
          information about the card content.
        </p>
      </div>
      <div className="trainer-card-right-content-container">
        <div className="trainer-card-right-data">
          <div className="reviews">5★</div>
          <div className="price">₪90</div>
        </div>
        <div>
          <button>Book a Session Now!</button>
        </div>
      </div>
    </div>
  );
};

export default Card;
