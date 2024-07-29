import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTrainers } from "../../redux/features/trainerSlice";
import "./TrainerReviews.css";

const TrainerReviews = () => {
  const dispatch = useDispatch();
  const trainers = useSelector((state) => state.trainer.trainers);
  const dummyUid = "8vYgnqL5o7sElCv6Hguf";
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    dispatch(fetchTrainers());
  }, [dispatch]);

  useEffect(() => {
    if (trainers.length > 0) {
      const matchedTrainer = trainers.find(
        (trainer) => trainer.uid === dummyUid
      );
      if (matchedTrainer) {
        console.log(matchedTrainer);

        const totalRating = matchedTrainer.reviews.reduce(
          (acc, review) => acc + parseInt(review.reviewRating, 10),
          0
        );
        const avgRating = (totalRating / matchedTrainer.reviews.length).toFixed(
          2
        );
        setAverageRating(avgRating);
      } else {
        console.log(`Trainer with uid ${dummyUid} not found.`);
      }
    }
  }, [trainers]);

  const matchedTrainer = trainers.find((trainer) => trainer.uid === dummyUid);

  if (!matchedTrainer) {
    return <div>Loading...</div>;
  }

  return (
    <section className="trainer-reviews-section">
      <h1 className="trainer-reviews-header">
        Welcome to your reviews, {matchedTrainer.name}
      </h1>
      <h2 className="trainer-reviews-average">
        Your average review score is: {averageRating}
      </h2>
      <div className="reviews-container">
        {matchedTrainer.reviews && matchedTrainer.reviews.length > 0 ? (
          matchedTrainer.reviews.map((review, index) => (
            <div key={index} className="review-card">
              <p>
                <strong>Reviewer:</strong> {review.userName}
              </p>
              <p>
                <strong>Review:</strong> {review.reviewText}
              </p>
              <p>
                <strong>Rating:</strong> {review.reviewRating}
              </p>
            </div>
          ))
        ) : (
          <p>No reviews available.</p>
        )}
      </div>
    </section>
  );
};

export default TrainerReviews;
