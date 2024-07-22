import { ButtonHome } from "../ButtonHome/ButtonHome";
import { Link } from "react-router-dom";

import "./HomeBecomeTrainer.css";

export const HomeBecomeTrainer = () => {
  return (
    <section className="home-trainer-section">
      <div className="home-trainer-image-container">
        <img src="#" alt="image" />
      </div>
      <div className="home-trainer-content-container">
        <h1 className="home-trainer-title">Become a Trainer</h1>
        <p className="home-trainer-text">
          Earn money sharing your expert knowledge with students. Sign up to
          start tutoring online with Preply *need to change - testing only*{" "}
        </p>
        <Link to={"become-trainer"}>
          <ButtonHome className={""} text={"become a trainer"} />
        </Link>
      </div>
    </section>
  );
};
