import "./BecomeTrainer.css";

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
            <div className="become-trainer-step-number-container">
              <h1 className="become-trainer-number">1</h1>
            </div>
            <div className="become-trainer-step-content">
              <h1 className="become-trainer-step-title">Sign up</h1>
              <p className="become-trainer-step-text">
                And create your trainer profile
              </p>
            </div>
          </div>
          <div className="become-trainer-step">
            <div className="become-trainer-step-number-container">
              <h1 className="become-trainer-number">2</h1>
            </div>
            <div className="become-trainer-step-content">
              <h1 className="become-trainer-step-title">Get approved</h1>
              <p className="become-trainer-step-text">By our team</p>
            </div>
          </div>
          <div className="become-trainer-step">
            <div className="become-trainer-step-number-container">
              <h1 className="become-trainer-number">3</h1>
            </div>
            <div className="become-trainer-step-content">
              <h1 className="become-trainer-step-title">Start training</h1>
              <p className="become-trainer-step-text">
                Becoming a part of the premier fitness community
              </p>
            </div>
          </div>
        </div>
        <button className="transparent-button">become a trainMate now</button>
      </div>
      <div className="become-trainer-image-container"></div>
    </section>
  );
};
