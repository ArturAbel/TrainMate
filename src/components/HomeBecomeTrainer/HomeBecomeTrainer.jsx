import { becomeTrainer } from "../../utilities/constants";
import { ButtonHome } from "../ButtonHome/ButtonHome";
import { Link } from "react-router-dom";

import "./HomeBecomeTrainer.css";

export const HomeBecomeTrainer = () => {
  return (
    <section className="home-trainer-section">
      <div className="home-trainer-image-container">
        <img className="home-trainer-image" src={becomeTrainer} alt="image" />
      </div>
      <div className="home-trainer-content-container">
        <h1 className="home-trainer-title">Become a Trainer</h1>
        <p className="home-trainer-text">
          Start earning by sharing your expertise with trainees.
        </p>
        <p className="home-trainer-text">
          Build your reputation by showcasing your expertise and earning
          positive reviews from satisfied clients. Enjoy the flexibility to
          manage your training sessions according to your convenience, with
          trainMate&apos;s adaptable scheduling options.
        </p>
        <p className="home-trainer-text">
          Join trainMate today and elevate your training business to new
          heights.
        </p>
        <Link to={"become-trainer"}>
          <ButtonHome
            className={"become-trainer-button"}
            text={"become a trainer"}
          />
        </Link>
      </div>
    </section>
  );
};
