import Loader from '../Loader/Loader';
import './QuizLoadingModal.css';

const QuizLoadingModal = () => {
  return (
    <div className="loading-quiz-modal">
      <div className="loader-container">
        <Loader/>
      </div>
      <div className='loading-quiz-modal-text-container'>
        <h1>Loading matched trainers for you ...</h1>
      </div>
    </div>
  );
};

export default QuizLoadingModal;

