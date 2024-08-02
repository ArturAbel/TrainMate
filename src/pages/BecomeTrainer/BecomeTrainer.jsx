import { ALT_IMAGE, becomeTrainerImage } from "../../utilities/constants";
import { Link } from "react-router-dom";

import "./BecomeTrainer.css";
import "./BecomeTrainer.tablet.css";

export const BecomeTrainer = () => {
  return (
    <section className="become-trainer-section">
      <div className="become-trainer-content-container">
        <h1 className="become-trainer-title">
          Elevate your career by becoming a part of the premier fitness training
          platform.
        </h1>
        <div className="become-trainer-steps-container">
          <div className="become-trainer-step">
            <div className="become-trainer-step-number-container number-container-1">
              <h1 className="become-trainer-number">1</h1>
            </div>
            <div className="become-trainer-step-content">
              <h1 className="become-trainer-step-title">Sign up</h1>
              <p className="become-trainer-step-text">
                Sign up and create your trainer profile.
              </p>
            </div>
          </div>
          <div className="become-trainer-step">
            <div className="become-trainer-step-number-container number-container-2">
              <h1 className="become-trainer-number">2</h1>
            </div>
            <div className="become-trainer-step-content">
              <h1 className="become-trainer-step-title">Get approved</h1>
              <p className="become-trainer-step-text">
                Get approved by our team.
              </p>
            </div>
          </div>
          <div className="become-trainer-step">
            <div className="become-trainer-step-number-container number-container-3">
              <h1 className="become-trainer-number">3</h1>
            </div>
            <div className="become-trainer-step-content">
              <h1 className="become-trainer-step-title">Start training</h1>
              <p className="become-trainer-step-text">
                Start training and become a part of the unique fitness
                community.
              </p>
            </div>
          </div>
        </div>
        <Link to={"/sign-up-trainer"}>
          <button className="button-transparent" id="become-trainer-button">
            become a trainMate!
          </button>
        </Link>
      </div>
      <div className="become-trainer-image-container">
        <img
          className="become-trainer-image"
          src={becomeTrainerImage}
          alt={ALT_IMAGE}
        />
      </div>
    </section>
  );
};
