import { useSelector, useDispatch } from "react-redux";
import { GoStarFill } from "react-icons/go";
import { BiShekel } from "react-icons/bi";
import { FiHeart } from "react-icons/fi";
import { Link } from "react-router-dom";

import { FaHeart } from "react-icons/fa6";
import "./TrainerCard.css";
import { useState } from "react";
import {
  addFavorite,
  removeFavorite,
} from "../../redux/features/usersSlice";
import { truncateText } from "../../utilities/truncateText";

const TrainerCard = ({
  favorite,
  id,
  imgSrc,
  name,
  reviews,
  ratings,
  price,
  sport,
  level,
  address,
  about,
  description,
  lessonLength
}) => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [isFavorited, setIsFavorited] = useState(favorite);

  const handleAddFavorite = (userId, id) => {
    dispatch(addFavorite(userId, id));
    setIsFavorited(true);
  };

  const handleRemoveFavorite = (userId, id) => {
    dispatch(removeFavorite(userId, id));
    setIsFavorited(false);
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
              {ratings}
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
          {!isFavorited ? (
            <FiHeart
              className="trainer-card-like"
              onClick={() => handleAddFavorite(user.uid, id)}
            />
          ) : (
            <FaHeart
              className="trainer-card-like"
              onClick={() => handleRemoveFavorite(user.uid, id)}
            />
          )}
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
