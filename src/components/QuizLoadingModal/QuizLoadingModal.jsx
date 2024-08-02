import Loader from "../Loader/Loader";

import "./QuizLoadingModal.css";
import "./QuizLoadingModal.tablet.css";

const QuizLoadingModal = () => {
  return (
    <div className="loading-quiz-modal">
      <div className="loader-container">
        <Loader />
      </div>
      <div className="loading-quiz-modal-title-container">
        <h1 className="loading-quiz-modal-title">
          Loading matched trainers for you ...
        </h1>
      </div>
    </div>
  );
};

export default QuizLoadingModal;
