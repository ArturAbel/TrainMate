import ReactStars from "react-rating-stars-component";

import "./TrainerInfoReviewCard.css";

export const TrainerInfoReviewCard = ({ review }) => {
  return (
    <div className="trainer-info-review-card-container">
      <div className="trainer-profile-reviews-list-upper-container">
        <div className="trainer-profile-reviews-list-image-container">
          <img
            className="trainer-profile-reviews-list-image"
            src={review.photoURL || ""}
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
      <p>{review.reviewText || ""}</p>
    </div>
  );
};
