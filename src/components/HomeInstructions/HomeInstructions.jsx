import { HomeInstructionCard } from "../HomeInstructionCard/HomeInstructionCard";
import {
  instructionThree,
  instructionTwo,
  instructionOne,
} from "./HomeInstructionsText";
import { ALT_IMAGE } from "../../utilities/constants";

import "./css/HomeInstructions.css";
import "./css/HomeInstructions.tablet.css";
import "./css/HomeInstructions.phone.css";

export const HomeInstructions = () => {
  return (
    <section className="home-instructions-section">
      <h1 className="home-instructions-title">How train.mate works?</h1>
      <div className="home-instruction-container">
        <HomeInstructionCard
          content={instructionOne.content}
          number={instructionOne.number}
          title={instructionOne.title}
          className={"instruction-1"}
        />
        <div className="home-instruction-image-container">
          <img
            className="home-instruction-one-image-one"
            src={instructionOne.image1}
            alt={ALT_IMAGE}
          />
          <img
            className="home-instruction-one-image-two"
            src={instructionOne.image2}
            alt={ALT_IMAGE}
            loading="lazy"
          />
        </div>
      </div>
      <div className="home-instruction-container" id="home-instruction-two">
        <div className="home-instruction-image-container">
          <img
            className="home-instruction-two-image"
            src={instructionTwo.image}
            alt={ALT_IMAGE}
            loading="lazy"
          />
        </div>
        <HomeInstructionCard
          content={instructionTwo.content}
          number={instructionTwo.number}
          title={instructionTwo.title}
          className={"instruction-2"}
        />
      </div>
      <div className="home-instruction-container">
        <HomeInstructionCard
          content={instructionThree.content}
          number={instructionThree.number}
          title={instructionThree.title}
          className={"instruction-3"}
        />
        <div className="home-instruction-image-container">
          <img
            className="home-instruction-three-image"
            src={instructionThree.image}
            alt={ALT_IMAGE}
          />
        </div>
      </div>
    </section>
  );
};
