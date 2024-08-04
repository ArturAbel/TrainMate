import { TrainerInfoReviewCard } from "../TrainerInfoReviewsCard/TrainerInfoReviewCard.";
import { IoMdClose } from "react-icons/io";

import "./css/TrainerInfoReviewsModal.css";
import "./css/TrainerInfoReviewsModal.tablet.css";
import "./css/TrainerInfoReviewsModal.phone.css";

export const TrainerInfoReviewsModal = ({ reviews, handleSeeMoreReviews }) => {
  return (
    <>
      <div className="trainer-reviews-modal-overlay"> </div>
      <div className="trainer-reviews-modal">
        <div className="trainer-reviews-modal-title-container">
          <h2>What my trainees say?</h2>
          <IoMdClose
            className="trainer-reviews-modal-close-icon"
            onClick={handleSeeMoreReviews}
          />
        </div>
        <div className="trainer-reviews-modal-reviews">
          {reviews.map((review, index) => (
            <TrainerInfoReviewCard review={review} key={index} />
          ))}
        </div>
      </div>
    </>
  );
};
