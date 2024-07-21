import "./HomeInstructions.css";

export const HomeInstructions = () => {
  return (
    <section className="home-instructions-section">
      <h1 className="home-instructions-title">How trainMate works?</h1>

      {/* Instruction 1 */}
      <div className="home-instruction-container">
        
        {/* Turn to component  "home-instruction-content-container"*/}
        <div className="home-instruction-content-container">
          <div className="home-instruction-content instruction-1">
            <div className="home-instruction-content-title-container">
              <div className="home-instruction-content-number">1</div>
              <div className="home-instruction-content-title">
                Find a Trainer
              </div>
            </div>
            <div className="home-instruction-content-text-container">
              <div className="home-instruction-content-text">
                We’ll connect you with a trainer who will motivate, challenge,
                and inspire you.
              </div>
            </div>
          </div>
        </div>

        <div className="home-instruction-image-container">
          <img src="#" alt="image" />
        </div>
      </div>

      {/* Instruction 2 */}
      <div className="home-instruction-container">
        <div className="home-instruction-image-container">
          <img src="#" alt="image" />
        </div>
        <div className="home-instruction-content-container">
          <div className="home-instruction-content instruction-2"></div>
        </div>
      </div>

      {/* Instruction 3 */}
      <div className="home-instruction-container">
        <div className="home-instruction-content-container">
          <div className="home-instruction-content instruction-3"></div>
        </div>
        <div className="home-instruction-image-container">
          <img src="#" alt="image" />
        </div>
      </div>
    </section>
  );
};
