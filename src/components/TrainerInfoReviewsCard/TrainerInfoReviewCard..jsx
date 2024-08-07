import { anonymousImage } from "../../utilities/constants";
import ReactStars from "react-rating-stars-component";

import "./css/TrainerInfoReviewCard.css";
import "./css/TrainerInfoReviewCard.phone.css";

export const TrainerInfoReviewCard = ({ review }) => {
  return (
    <div className="trainer-info-review-card-container">
      <div className="trainer-profile-reviews-list-upper-container">
        <div className="trainer-profile-reviews-list-image-container">
          <img
            className="trainer-profile-reviews-list-image"
            src={review.photoURL || anonymousImage}
            alt="user"
          />
        </div>
        <p>{review.displayName || ""}</p>
      </div>
      <ReactStars
        activeColor="var(--background-secondary1)"
        value={review.starRating}
        edit={false}
        count={5}
        size={24}
      />
      <p>{review.comment || ""}</p>
    </div>
  );
};
