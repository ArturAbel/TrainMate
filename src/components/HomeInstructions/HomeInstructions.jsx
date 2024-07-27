import { HomeInstructionCard } from "../HomeInstructionCard/HomeInstructionCard";
import {
  instructionThree,
  instructionTwo,
  instructionOne,
} from "./HomeInstructionsText";

import "./HomeInstructions.css";

export const HomeInstructions = () => {
  return (
    <section className="home-instructions-section">
      <h1 className="home-instructions-title">How trainMate works?</h1>

      {/* Instruction 1 */}
      <div className="home-instruction-container">
        <HomeInstructionCard
          content={instructionOne.content}
          number={instructionOne.number}
          title={instructionOne.title}
          className={"instruction-1"}
        />
        <div className="home-instruction-image-container">
          <img className="home-instruction-one-image-one" src={instructionOne.image1} alt="image" />
          <img className="home-instruction-one-image-two" src={instructionOne.image2} alt="image" />
        </div>
      </div>

      {/* Instruction 2 */}
      <div className="home-instruction-container">
        <div className="home-instruction-image-container">
          <img className="home-instruction-two-image" src={instructionTwo.image} alt="image" />
        </div>
        <HomeInstructionCard
          content={instructionTwo.content}
          number={instructionTwo.number}
          title={instructionTwo.title}
          className={"instruction-2"}
        />
      </div>

      {/* Instruction 3 */}
      <div className="home-instruction-container">
        <HomeInstructionCard
          content={instructionThree.content}
          number={instructionThree.number}
          title={instructionThree.title}
          className={"instruction-3"}
        />
        <div className="home-instruction-image-container">
          <img className="home-instruction-three-image" src={instructionThree.image} alt="image" />
        </div>
      </div>
    </section>
  );
};
