import { TrainerInfoReviewsCard } from "../TrainerInfoReviewsCard/TrainerInfoReviewsCard";
import { IoMdClose } from "react-icons/io";

import "./TrainerInfoReviewsModal.css";

export const TrainerInfoReviewsModal = ({ reviews }) => {
  return (
    <div className="trainer-reviews-modal">
      <div className="trainer-reviews-modal-title-container">
        <h2>What my trainees say?</h2>
        <IoMdClose className="trainer-reviews-modal-close-icon" />
      </div>
      <div className="trainer-reviews-modal-inner">
        {reviews.map((review, index) => (
          <TrainerInfoReviewsCard review={review} key={index} />
        ))}
      </div>
    </div>
  );
};
