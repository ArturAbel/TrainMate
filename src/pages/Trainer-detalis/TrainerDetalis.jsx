import { fetchTrainers } from "../../redux/features/trainerSlice";
import { BiMessageSquareDetail, BiShekel } from "react-icons/bi";
import { useSelector, useDispatch } from "react-redux";
import { IoMdArrowRoundBack } from "react-icons/io";
import { MdFitnessCenter } from "react-icons/md";
import { Link, useParams } from "react-router-dom";
import { GoStarFill } from "react-icons/go";
import { FiHeart } from "react-icons/fi";
import { IoTime } from "react-icons/io5";
import { useEffect } from "react";

import "./TrainerDetails.css";

const TrainerDetails = () => {
  // Get the ID from the URL parameters
  const dispatch = useDispatch();
  const { id } = useParams();

  const { trainers, loading, error } = useSelector((state) => state.trainer);

  useEffect(() => {
    if (trainers.length === 0) {
      console.log("Trainers array is empty. Fetching trainers...");
      dispatch(fetchTrainers());
    }
  }, [dispatch, trainers.length]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const trainer = trainers.find((trainer) => trainer.uid === id);

  if (trainer) {
    const {
      lessonLength,
      description,
      address,
      reviews,
      ratings,
      image,
      sport,
      price,
      level,
      name,
      about,
    } = trainer;

    console.log(trainer);

    return (
      <section className="trainer-profile-section" key={trainer.id}>
        <div className="trainer-profile-content-container">
          <Link to={"/trainers"}>
            <IoMdArrowRoundBack className="trainer-profile-back-icon" />
          </Link>
          {/* Intro */}
          <div className="trainer-profile-content-intro">
            <div className="trainer-profile-image-container">
              <img className="trainer-profile-image" src={image} alt={name} />
            </div>
            <div className="trainer-profile-intro-container">
              <h1 className="trainer-profile-intro-name">{name}</h1>
              <p className="trainer-profile-intro-description">{description}</p>
              <p className="trainer-profile-intro-teach">
                <strong>teaches:</strong>
                <span> {sport}</span>
              </p>
              <p className="trainer-profile-intro-teach">
                <strong>location:</strong>
                <span> {address}</span>
              </p>
            </div>
          </div>

          {/* About Me */}
          <div className="trainer-profile-about-me-container">
            <h1 className="trainer-profile-about-me-title">about me</h1>
            <p className="trainer-profile-about-me-content">{about}</p>
          </div>

          {/* I Teach */}
          <div className="trainer-profile-teach-container">
            <h1 className="trainer-profile-teach-title">i teach</h1>
            <span className="trainer-profile-teach-spans">
              <span>{sport}</span>
              <span>
                {level.map((level, index) => (
                  <span
                    className="trainer-profile-teach-span-level"
                    key={index}
                  >
                    {level}
                  </span>
                ))}
              </span>
            </span>
          </div>

          {/* My Reviews */}
          <div className="trainer-profile-reviews-container">
            <h1 className="trainer-profile-teach-title">my reviews</h1>
            <p>add reviews here</p>
          </div>
        </div>

        {/* Right container */}
        <div className="trainer-profile-actions-container">
          <div className="trainer-profile-actions-map">add map</div>
          <div className="trainer-profile-actions-data-container">
            <div className="trainer-profile-actions-data-item">
              <GoStarFill className="trainer-profile-button-icon" />
              <p>{ratings}</p>
            </div>
            <div className="trainer-profile-actions-data-item">
              <BiShekel className="trainer-profile-button-icon" />
              <p>{price}/lesson</p>
            </div>
            <div className="trainer-profile-actions-data-item">
              <IoTime className="trainer-profile-button-icon" />
              <p>{lessonLength}</p>
            </div>
          </div>
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
