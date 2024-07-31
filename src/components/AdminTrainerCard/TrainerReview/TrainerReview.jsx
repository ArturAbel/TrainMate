import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import ReactStars from "react-rating-stars-component";
import "./TrainerReview.css";
import { useDispatch, useSelector } from "react-redux";
import LeoProfanity from "leo-profanity";
import { upsertReview } from "../../../redux/features/usersSlice";
const TrainerReview = ({ trainerId, setIsModalOpen }) => {
  const { user } = useSelector((state) => state.auth);
  const [isClean, setIsClean] = useState(true);
  const checkForBadWords = () => {
    const cleanedText = LeoProfanity.clean(reviewText);
    setIsClean(cleanedText === reviewText);
  };

  const dispatch = useDispatch();
  const handleUpsertReview = (userId, trainerId, starRating, comment) => {
    dispatch(upsertReview(userId, trainerId, starRating, comment));
  };

  const [selectedRating, setSelectedRating] = useState(0);
  const [reviewText, setReviewText] = useState("");

  const handleRatingChange = (newRating) => {
    setSelectedRating(newRating);
  };

  const handleInputChange = (event) => {
    setReviewText(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    checkForBadWords();
    const cleanedText = LeoProfanity.clean(reviewText);
    const isTextClean = cleanedText === reviewText;

    if (isTextClean) {
      handleUpsertReview(user.uid, trainerId, selectedRating, reviewText);
    }
  };

  return (
    <>
      <div className="trainer-add-review-overlay"></div>
      <div className="trainer-review-container">
        <div className="trainer-review-container-upper">
          <h2 className="trainer-review-title">Add a review</h2>
          <IoMdClose
            onClick={() => setIsModalOpen((prev) => !prev)}
            className="trainer-review-close-icon"
          />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="rating-container">
            <ReactStars
              activeColor="var(--background-secondary1)"
              onChange={handleRatingChange}
              value={selectedRating}
              edit={true}
              count={5}
              size={24}
            />
          </div>
          <textarea
            className="trainer-review-textarea"
            placeholder="Write your review here..."
            onChange={handleInputChange}
            value={reviewText}
            rows="4"
          ></textarea>
          <button
            type="submit"
            className="button-transparent"
            id="trainer-review-add-review-button"
          >
            Submit Review
          </button>
          <p>{isClean ? "" : "Review contains inappropriate language."}</p>
        </form>
      </div>
    </>
  );
};

export default TrainerReview;
