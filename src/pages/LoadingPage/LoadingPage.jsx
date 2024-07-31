import "./LoadingPage.css"; // Make sure to create this CSS file

const LoadingPage = () => {
  return (
    <div className="loading-quiz-modal">
      <div className="loader-container">
        <div className="loader-quiz"></div>
      </div>
      <h1>Don't stop until you're proud</h1>
    </div>
  );
};

export default LoadingPage;
