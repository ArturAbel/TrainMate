import { removeFavorite, addFavorite } from "../../redux/features/usersSlice";
import { calculateAverageRating } from "../../utilities/calculateAvgRating";
import { truncateText } from "../../utilities/truncateText";
import { useSelector, useDispatch } from "react-redux";
import { GoStarFill } from "react-icons/go";
import { BiShekel } from "react-icons/bi";
import { FaHeart } from "react-icons/fa6";
import { FiHeart } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useState } from "react";

import "./TrainerCard.css";

const TrainerCard = ({
  lessonLength,
  description,
  favorite,
  reviews,
  address,
  ratings,
  imgSrc,
  price,
  sport,
  level,
  about,
  name,
  id,
  inAdmin = null,
  onVailerClick,
}) => {
  const [isFavorited, setIsFavorited] = useState(favorite);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleAddFavorite = (userId, id) => {
    dispatch(addFavorite(userId, id));
    setIsFavorited(true);
    if (onVailerClick) onVailerClick(id); // vailer id will check shit
  };

  const handleRemoveFavorite = (userId, id) => {
    dispatch(removeFavorite(userId, id));
    setIsFavorited(false);
    if (onVailerClick) onVailerClick(id); // also vailer id check shit
  };

  return (
    <div className="trainer-card-container">
      <div className="trainer-card-image-container">
        <img className="trainer-card-image" src={imgSrc} alt={name} />
      </div>
      <div className="trainer-card-content-container">
        <h1 className="trainer-card-name">{name}</h1>
        <p className="trainer-card-information">{description}</p>
        <span className="trainer-card-sport">{sport}</span>
        <p className="trainer-card-level">{level.join(", ")}</p>
        <p className="trainer-card-location">{address}</p>
        <p className="trainer-card-information">{truncateText(about, 30)}</p>
      </div>
      <div className="trainer-card-right-content-container">
        <div className="trainer-card-right-data">
          <div className="trainer-card-reviews-container">
            <div className="trainer-card-reviews">
              <GoStarFill className="trainer-card-icon" />
              {calculateAverageRating(ratings)}
            </div>
            {`${reviews.length} reviews`}
          </div>
          <div className="trainer-card-price-lesson-length-container">
            <div className="trainer-card-price">
              <BiShekel className="trainer-card-icon" />
              {price}
            </div>
            {`${lessonLength} Min Lesson`}
          </div>
          {!inAdmin ? (
            <div
              onClick={() =>
                isFavorited
                  ? handleRemoveFavorite(user.uid, id)
                  : handleAddFavorite(user.uid, id)
              }
            >
              {isFavorited ? (
                <FaHeart className="trainer-card-like" />
              ) : (
                <FiHeart className="trainer-card-like" />
              )}
            </div>
          ) : null}
        </div>
        <div>
          <Link to={`/trainers/${id}`}>
            <button className="button-transparent" id="trainer-card-button">
              book a session
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TrainerCard;
