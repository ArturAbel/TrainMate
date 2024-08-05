import { ALT_IMAGE, becomeTrainerImage } from "../../utilities/constants";
import { becomeTrainerText } from "./BecomeTrainerText";
import { Link } from "react-router-dom";

import "./css/BecomeTrainer.css";
import "./css/BecomeTrainer.tablet.css";
import "./css/BecomeTrainer.phone.css";

export const BecomeTrainer = () => {
  return (
    <section className="become-trainer-section">
      <div className="become-trainer-content-container">
        <h1 className="become-trainer-title">{becomeTrainerText.title}</h1>
        <div className="become-trainer-steps-container">
          <div className="become-trainer-step">
            <div className="become-trainer-step-number-container number-container-1">
              <h1 className="become-trainer-number">
                {becomeTrainerText.stepOne.number}
              </h1>
            </div>
            <div className="become-trainer-step-content">
              <h1 className="become-trainer-step-title">
                {becomeTrainerText.stepOne.title}
              </h1>
              <p className="become-trainer-step-text">
                {becomeTrainerText.stepOne.text}
              </p>
            </div>
          </div>
          <div className="become-trainer-step">
            <div className="become-trainer-step-number-container number-container-2">
              <h1 className="become-trainer-number">
                {becomeTrainerText.stepTwo.number}
              </h1>
            </div>
            <div className="become-trainer-step-content">
              <h1 className="become-trainer-step-title">
                {becomeTrainerText.stepTwo.title}
              </h1>
              <p className="become-trainer-step-text">
                {becomeTrainerText.stepTwo.text}
              </p>
            </div>
          </div>
          <div className="become-trainer-step">
            <div className="become-trainer-step-number-container number-container-3">
              <h1 className="become-trainer-number">
                {becomeTrainerText.stepThree.number}
              </h1>
            </div>
            <div className="become-trainer-step-content">
              <h1 className="become-trainer-step-title">
                {becomeTrainerText.stepThree.title}
              </h1>
              <p className="become-trainer-step-text">
                {becomeTrainerText.stepThree.text}
              </p>
            </div>
          </div>
        </div>
        <Link to={"/sign-up-trainer"}>
          <button className="button-transparent" id="become-trainer-button">
            {becomeTrainerText.button}
          </button>
        </Link>
      </div>
      <div className="become-trainer-image-container">
        <img
          className="become-trainer-image"
          src={becomeTrainerImage}
          alt={ALT_IMAGE}
          loading="lazy"
        />
      </div>
    </section>
  );
};
