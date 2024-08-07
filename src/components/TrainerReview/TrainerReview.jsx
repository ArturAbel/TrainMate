import { upsertReview } from "../../redux/features/usersSlice";
import ReactStars from "react-rating-stars-component";
import { IoMdClose } from "react-icons/io";
import { useSelector } from "react-redux";
import LeoProfanity from "leo-profanity";
import { useState } from "react";

import "./css/TrainerReview.css";
import "./css/TrainerReview.tablet.css";
import "./css/TrainerReview.phone.css";

const TrainerReview = ({ trainerId, setIsModalOpen }) => {
  const { user } = useSelector((state) => state.auth);
  const [isClean, setIsClean] = useState(true);
  const [selectedRating, setSelectedRating] = useState(0);
  const [reviewText, setReviewText] = useState("");

  const checkForBadWords = () => {
    const cleanedText = LeoProfanity.clean(reviewText);
    setIsClean(cleanedText === reviewText);
  };

  const handleUpsertReview = async (
    userId,
    trainerId,
    starRating,
    comment,
    displayName,
    photoURL
  ) => {
    await upsertReview(
      userId,
      trainerId,
      starRating,
      comment,
      displayName,
      photoURL
    );
  };

  const handleRatingChange = (newRating) => {
    setSelectedRating(newRating);
  };

  const handleInputChange = (event) => {
    setReviewText(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    checkForBadWords();
    const cleanedText = LeoProfanity.clean(reviewText);
    const isTextClean = cleanedText === reviewText;

    if (isTextClean) {
      console.log("Submitting review with the following details:");
      console.log("User ID:", user.uid);
      console.log("Trainer ID:", trainerId);
      console.log("Star Rating:", selectedRating);
      console.log("Review Text:", reviewText);
      console.log("Display Name:", user.displayName);
      console.log("Photo URL:", user.photoURL);

      await handleUpsertReview(
        user.uid,
        trainerId,
        selectedRating,
        reviewText,
        user.displayName,
        user.photoURL
      );

      // Close the modal after submitting the review
      setIsModalOpen(false);
    }
  };

  return (
    <>
      <div className="trainer-add-review-overlay"></div>
      <div className="trainer-review-container">
        <div className="trainer-review-container-upper">
          <h2 className="trainer-review-title">Add a review</h2>
          <IoMdClose
            onClick={() => setIsModalOpen(false)}
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
            id="trainer-review-add-review-button"
            className="button-transparent"
            type="submit"
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
