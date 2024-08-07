import { fetchTrainers } from "../../redux/features/trainerSlice";
import { useDispatch, useSelector } from "react-redux";
import ReactStars from "react-rating-stars-component";
import Loader from "../../components/Loader/Loader";
import { useParams } from "react-router";
import { useEffect } from "react";

import "./css/TrainerReviews.css";
import "./css/TrainerReviews.tablet.css";
import "./css/TrainerReviews.phone.css";

const TrainerReviews = () => {
  const trainers = useSelector((state) => state.trainer.trainers);
  const { trainerId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTrainers());
  }, [dispatch]);

  const matchedTrainer = trainers.find((trainer) => trainer.uid === trainerId);

  if (!matchedTrainer) {
    return <Loader />;
  }

  return (
    <section className="trainer-reviews-section">
      <h1 className="trainer-reviews-header">
        Welcome to your reviews,
        <span className="trainer-reviews-header-name">
          {matchedTrainer.name}
        </span>
        .
      </h1>
      <div className="reviews-container">
        {matchedTrainer.reviews && matchedTrainer.reviews.length > 0 ? (
          matchedTrainer.reviews.map((review, index) => (
            <div key={index} className="review-card">
              <img
                className="review-user-image"
                src={review.photoURL}
                alt={review.displayName}
              />
              <div className="review-content">
                <p className="reviewer-name">{review.displayName}</p>
                <p className="review-date">
                  {new Date(review.createdAt.seconds * 1000).toLocaleString()}
                </p>
                <p className="review-text">{review.comment}</p>
                <div className="rating-container">
                  <ReactStars
                    value={review.starRating}
                    activeColor="var(--background-main2)"
                    edit={false}
                    count={5}
                    size={24}
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
