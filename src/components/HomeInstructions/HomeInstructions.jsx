import { HomeInstructionCard } from "../HomeInstructionCard/HomeInstructionCard";
import "./HomeInstructions.css";

export const HomeInstructions = () => {
  return (
    <section className="home-instructions-section">
      <h1 className="home-instructions-title">How trainMate works?</h1>

      {/* Instruction 1 */}
      <div className="home-instruction-container">
        <HomeInstructionCard
          content={
            "We’ll connect you with a trainer who will motivate, challenge, and inspire you."
          }
          className={"instruction-1"}
          title={"Find a Trainer"}
          number={"1"}
        />
        <div className="home-instruction-image-container">
          <img src="#" alt="image" />
        </div>
      </div>

      {/* Instruction 2 */}
      <div className="home-instruction-container">
        <div className="home-instruction-image-container">
          <img src="#" alt="image" />
        </div>
        <HomeInstructionCard
          content={"content"}
          className={"instruction-2"}
          title={"title"}
          number={"2"}
        />
      </div>
      
      {/* Instruction 3 */}
      <div className="home-instruction-container">
        <HomeInstructionCard
          content={"content"}
          className={"instruction-3"}
          title={"title"}
          number={"3"}
        />
        <div className="home-instruction-image-container">
          <img src="#" alt="image" />
        </div>
      </div>
    </section>
  );
};
