import { fetchTrainers } from "../../redux/features/trainerSlice";
import { useSelector, useDispatch } from "react-redux";
import { BiMessageSquareDetail } from "react-icons/bi";
import { MdFitnessCenter } from "react-icons/md";
import { useParams } from "react-router-dom";
import { FiHeart } from "react-icons/fi";
import { useEffect } from "react";

import "./TrainerDetails.css";

const TrainerDetails = () => {
  // Get the ID from the URL parameters
  const { id } = useParams();
  const dispatch = useDispatch();

  const { trainers, loading, error } = useSelector((state) => state.trainer);

  useEffect(() => {
    if (trainers.length === 0) {
      console.log("Trainers array is empty. Fetching trainers...");
      dispatch(fetchTrainers());
    } else {
      console.log("Trainers already loaded:", trainers.length);
    }
  }, [dispatch, trainers.length]);

  if (loading) {
    console.log("Loading trainers...");
    return <div>Loading...</div>;
  }

  if (error) {
    console.log("Error loading trainers:", error);
    return <div>Error: {error}</div>;
  }

  const trainer = trainers.find((trainer) => trainer.uid === id);

  if (trainer) {
    console.log("Success: Matching trainer found:", trainer);

    const {
      description,
      location,
      reviews,
      imgSrc,
      sport,
      level,
      price,
      name,
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
              <p className="trainer-profile-intro-description">
                some description about the trainer
              </p>
              <p className="trainer-profile-intro-teach">
                <strong>teaches:</strong> {sport}
              </p>
            </div>
          </div>

          {/* About Me */}
          <div className="trainer-profile-about-me-container">
            <h1 className="trainer-profile-about-me-title">about me</h1>
            <p className="trainer-profile-about-me-content">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempore
              consequuntur officia distinctio tenetur, dignissimos inventore!
              Quibusdam fugiat earum, porro eligendi quidem odit necessitatibus
              impedit cumque laudantium maxime! Id asperiores similique,
              doloremque inventore dolor qui debitis ullam exercitationem harum
              ratione corporis quae laborum, ipsam sunt molestiae, assumenda
              adipisci cumque fugit nemo?
            </p>
          </div>

          {/* I Teach */}
          <div className="trainer-profile-teach-container">
            <h1 className="trainer-profile-teach-title">i teach</h1>
            <span className="trainer-profile-teach-spans">
              <span>name of sport</span>
              <span className="trainer-profile-teach-span-level">
                level name
              </span>
            </span>
          </div>

        {/* My Reviews */}
          <div className="trainer-profile-reviews-container">
            <h1 className="trainer-profile-teach-title">my reviews</h1>
          </div>
        </div>

        {/* Right container */}
        <div className="trainer-profile-actions-container">
          <div className="trainer-profile-actions-map">map</div>
          <div className="trainer-profile-actions-data-container">data</div>
          <div className="trainer-profile-actions-buttons-container">
            <button className="button-transparent" id="trainer-book-button">
              <MdFitnessCenter className="trainer-profile-button-icon" />
              book a training
            </button>
            <button className="button-transparent" id="trainer-profile-button">
              <BiMessageSquareDetail className="trainer-profile-button-icon" />
              send message
            </button>
            <button className="button-transparent" id="trainer-profile-button">
              <FiHeart className="trainer-profile-button-icon" />
              add to favorite
            </button>
          </div>
        </div>
      </section>
    );
  } else {
    return <div>Trainer not found</div>;
  }
};

export default TrainerDetails;
