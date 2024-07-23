import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchTrainers } from "../../redux/features/trainerSlice";
import "./TrainerDetails.css";
const TrainerDetails = () => {
  // Get the ID from the URL parameters
  const { id } = useParams();
  const dispatch = useDispatch();

  console.log("Extracted ID from URL:", id);

  const { trainers, loading, error } = useSelector((state) => state.trainer);

  useEffect(() => {
    if (trainers.length === 0) {
      console.log("Trainers array is empty. Fetching trainers...");
      dispatch(fetchTrainers());
    } else {
      console.log("Trainers already loaded:", trainers.length);
    }
  }, [dispatch, trainers.length]);

  console.log("Current trainers state:", trainers);

  if (loading) {
    console.log("Loading trainers...");
    return <div>Loading...</div>;
  }

  if (error) {
    console.log("Error loading trainers:", error);
    return <div>Error: {error}</div>;
  }

  // Find the trainer with matching ID, converting trainer.id to a number if necessary
  const trainer = trainers.find((trainer) => trainer.uid === id);

  if (trainer) {
    console.log("Success: Matching trainer found:", trainer);

    const {
      name,
      imgSrc,
      sport,
      level,
      location,
      description,
      reviews,
      price,
    } = trainer;

    return (
      <section className="trainer-profile-section" key={trainer.id}>
        <div className="trainer-profile-content-container">

          {/* Intro */}
          <div className="trainer-profile-content-intro">
            <div className="trainer-profile-image-container">
              <img className="trainer-profile-image" src={imgSrc} alt={name} />
            </div>
            <div className="trainer-profile-intro-container">
              <h1 className="trainer-profile-intro-name">{name}</h1>
              <p className="trainer-profile-intro-description">some description about the trainer</p>
              <p className="trainer-profile-intro-teach">
                <strong>teaches:</strong> {sport}
              </p>
            </div>
          </div>

          {/* About Me */}

        <div></div>
          <div className="profile-details">
            <p className="profile-level">
              <strong>Level:</strong> {level}
            </p>
            <p className="profile-location">
              <strong>Location:</strong> {location}
            </p>
            <p className="profile-description">{description}</p>
            <p className="profile-reviews">
              <strong>Reviews:</strong> {reviews}★
            </p>
            <p className="profile-price">
              <strong>Price:</strong> ₪{price}
            </p>
          </div>
        </div>

        <div className="trainer-profile-actions-container"></div>
      </section>
    );
  } else {
    console.log("Trainer not found");
    return <div>Trainer not found</div>;
  }
};

export default TrainerDetails;
