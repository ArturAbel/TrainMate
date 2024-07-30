import "./TrainerInfoReviewsCard.css";

export const TrainerInfoReviewsCard = ({ review }) => {
  return (
    <div>
      <div className="trainer-profile-reviews-list-upper-container">
        <div className="trainer-profile-reviews-list-image-container">
          <img
            className="trainer-profile-reviews-list-image"
            src={review.userImage || ""}
            alt="user"
          />
        </div>
        <p>{review.userName || ""}</p>
      </div>
      <p>Rating: {review.userRating || ""}</p>
      <p>{review.reviewText || ""}</p>
    </div>
  );
};
