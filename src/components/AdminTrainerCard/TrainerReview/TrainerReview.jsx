import React, { useState } from "react";
import ReactStars from "react-rating-stars-component";
import "./TrainerReview.css";
import { useDispatch, useSelector } from "react-redux";
//upsertReview
//userId, trainerId, starRating, comment
import { upsertReview } from "../../../redux/features/usersSlice";
const TrainerReview = (trainerId) => {
  const { user } = useSelector((state) => state.auth);

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
    console.log(
      "Submitted review:",
      reviewText,
      "with rating:",
      selectedRating
    );
    handleUpsertReview(user.id, trainerId, selectedRating, reviewText);
    // Here you can add more complex logic, like sending the data to a server
  };

  return (
    <>
      <div>TrainerReview</div>
      <form onSubmit={handleSubmit}>
        <div className="rating-container">
          <ReactStars
            value={selectedRating}
            activeColor="#ffd700"
            count={5}
            edit={true}
            size={24}
            onChange={handleRatingChange}
          />
        </div>
        <textarea
          value={reviewText}
          onChange={handleInputChange}
          placeholder="Write your review here..."
          rows="4"
        ></textarea>
        <button type="submit">Submit Review</button>
      </form>
    </>
  );
};

export default TrainerReview;
