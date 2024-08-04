import Loader from "../Loader/Loader";

import "./css/QuizLoadingModal.css";
import "./css/QuizLoadingModal.phone.css";

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
