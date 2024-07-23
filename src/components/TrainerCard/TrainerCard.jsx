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
  fetchUsers,
  removeFavorite,
} from "../../redux/features/usersSlice";
const TrainerCard = ({
  favorite,
  id,
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
