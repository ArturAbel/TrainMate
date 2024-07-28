import { fetchTrainers } from "../../redux/features/trainerSlice";
import { useDispatch, useSelector } from "react-redux";
import ReactStars from "react-rating-stars-component";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

import "./TrainerReviews.css";

const TrainerReviews = () => {
  const dispatch = useDispatch();
  const { trainers } = useSelector((state) => state.trainer);
  const { trainerId } = useParams();
  const [trainer, setTrainer] = useState(null);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    dispatch(fetchTrainers());
  }, [dispatch]);

  useEffect(() => {
    if (trainers.length > 0) {
      const matchedTrainer = trainers.find(
        (trainer) => trainer.uid === trainerId
      );
      setTrainer(matchedTrainer);
      if (matchedTrainer) {
        setReviews(matchedTrainer.reviews);
      }
    }
  }, [trainers, trainerId]);

  if (!trainer) {
    return <div>Loading...</div>;
  }

  return (
    <section className="trainer-reviews-section">
      <h1 className="trainer-reviews-header">
        Welcome to your reviews, {trainer.name}
      </h1>
      {reviews && reviews.length > 0 ? (
        <div className="reviews-container">
          {reviews.map((review, index) => (
            <div className="review-card" key={index}>
              <div className="reviewer-info">
                <img src={review.userImage} alt="Reviewer" />
                <p>{review.userName}</p>
              </div>
              <p className="review-text">{review.reviewText}</p>
              <div className="review-rating">
                <ReactStars
                  value={parseFloat(review.reviewRating)}
                  activeColor="#ffd700"
                  isHalf={false}
                  edit={false}
                  count={5}
                  size={20}
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <h1 className="empty-reviews-message">
          Sorry, you have no reviews yet.
        </h1>
      )}
    </section>
  );
};

export default TrainerReviews;






