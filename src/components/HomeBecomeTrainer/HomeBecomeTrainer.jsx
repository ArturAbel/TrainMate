import { ALT_IMAGE, becomeTrainer } from "../../utilities/constants";
import { becomeTrainerText } from "./HomeBecomeTrainerText";
import { ButtonHome } from "../ButtonHome/ButtonHome";
import { Link } from "react-router-dom";

import "./css/HomeBecomeTrainer.css";
import "./css/HomeBecomeTrainer.tablet.css";
import "./css/HomeBecomeTrainer.phone.css";

export const HomeBecomeTrainer = () => {
  return (
    <section className="home-trainer-section">
      <div className="home-trainer-image-container">
        <img
          className="home-trainer-image"
          src={becomeTrainer}
          alt={ALT_IMAGE}
        />
      </div>
      <div className="home-trainer-content-container">
        <h1 className="home-trainer-title">{becomeTrainerText.title}</h1>
        <p className="home-trainer-text">{becomeTrainerText.text1}</p>
        <p className="home-trainer-text">{becomeTrainerText.text2}</p>
        <p className="home-trainer-text">{becomeTrainerText.text3}</p>
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
