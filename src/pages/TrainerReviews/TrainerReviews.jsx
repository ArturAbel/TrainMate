import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTrainers } from "../../redux/features/trainerSlice";
import { useParams } from "react-router";
import ReactStars from "react-rating-stars-component";
import "./TrainerReviews.css";

const TrainerReviews = () => {
  const dispatch = useDispatch();
  const trainers = useSelector((state) => state.trainer.trainers);
  const { trainerId } = useParams();

  useEffect(() => {
    dispatch(fetchTrainers());
  }, [dispatch]);

  const matchedTrainer = trainers.find((trainer) => trainer.uid === trainerId);

  if (!matchedTrainer) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <section className="trainer-reviews-section">
      <h1 className="trainer-reviews-header">
        Welcome to your reviews, {matchedTrainer.name}
      </h1>
      <div className="reviews-container">
        {matchedTrainer.reviews && matchedTrainer.reviews.length > 0 ? (
          matchedTrainer.reviews.map((review, index) => (
            <div key={index} className="review-card">
              <img src={review.userImage} alt={review.userName} className="review-user-image" />
              <div className="review-content">
                <p className="reviewer-name">{review.userName}</p>
                <p className="review-text">{review.reviewText}</p>
                <div className="rating-container">
                  <ReactStars
                    count={5}
                    value={review.userRating}
                    edit={false}
                    size={24}
                    activeColor="#ffd700"
                  />
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="no-reviews">No reviews available.</p>
        )}
      </div>
    </section>
  );
};

export default TrainerReviews;




