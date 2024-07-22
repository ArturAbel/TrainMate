import { BiShekel } from "react-icons/bi";
import { GoStarFill } from "react-icons/go";
import { CiHeart } from "react-icons/ci";
import "./TrainerCard.css";

const TrainerCard = ({
  imgSrc,
  experience,
  expertise,
  name,
  reviews,
  price,
  sport,
  level,
  location,
  information,
}) => {
  return (
    <div className="trainer-card-container">
      <div className="trainer-card-image-container">
        <img className="trainer-card-image" src={imgSrc} alt={name} />
      </div>
      <div className="trainer-card-content-container">
        <h1 className="trainer-card-name">{name}</h1>
        <span className="trainer-card-sport">{sport}</span>
        <p className="trainer-card-level">{level}</p>
        <p className="trainer-card-location">{location}</p>
        <p className="trainer-card-information">{information}</p>
      </div>
      <div className="trainer-card-right-content-container">
        <div className="trainer-card-right-data">
          <div className="trainer-card-reviews">
            <GoStarFill className="trainer-card-icon" />
            {reviews}
          </div>
          <div className="trainer-card-price">
            <BiShekel className="trainer-card-icon" />
            {price}
          </div>
          <CiHeart className="trainer-card-like" />
        </div>
        <div>
          <button className="button-transparent" id="trainer-card-button">
            book a session
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrainerCard;
