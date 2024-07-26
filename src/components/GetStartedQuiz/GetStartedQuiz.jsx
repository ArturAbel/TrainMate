import QuizLoadingModal from "../QuizLoadingModal/QuizLoadingModal";
import { fetchTrainers } from "../../redux/features/trainerSlice";
import { updateAnswer } from "../../redux/features/quizSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { useEffect, useState } from "react";

import "./GetStartedQuiz.css";

const GetStartedQuiz = () => {
  const [isLoadingModalOpen, setIsLoadingModalOpen] = useState(false);
  const answers = useSelector((state) => state.quiz.answers);
  const { trainers } = useSelector((state) => state.trainer);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [sliderValue, setSliderValue] = useState(70);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchTrainers());
  }, [dispatch]);

  const sportsOptions = Array.from(
    new Set(trainers.map((trainer) => trainer.sport).sort())
  );

  const locationOptions = Array.from(
    new Set(trainers.map((trainer) => trainer.address).sort())
  );

  const questions = [
    {
      question: "What do you want to train in?",
      options: ["Add All", ...sportsOptions],

      type: "dropdown",
    },
    {
      question: "Whats your level?",
      options: ["Beginner", "Intermediate", "Advanced", "Expert", "Master"],
    },
    {
      question: "In which location?",
      options: [...locationOptions],
      showAll: true,
    },
    {
      question: "What's your budget per lesson?",
      options: ["₪5 - ₪100+"],
      slider: true,
    },
  ];

  const handleNext = () => {
    if (questions[currentQuestion].slider) {
      dispatch(
        updateAnswer({ index: currentQuestion, answer: `${sliderValue}` })
      );
    } else if (!answers[currentQuestion] || answers[currentQuestion] === " ") {
      dispatch(updateAnswer({ index: currentQuestion, answer: null }));
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setIsLoadingModalOpen(true);
      setTimeout(() => {
        setIsLoadingModalOpen(false);
        navigate("/trainers");
      }, 7000);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSliderChange = (event) => {
    setSliderValue(event.target.value);
  };

  const handleOptionChange = () => (event) => {
    dispatch(
      updateAnswer({ index: currentQuestion, answer: event.target.value })
    );
  };

  return (
    <>
      {isLoadingModalOpen && <QuizLoadingModal />}
      <div className="quiz-container-section">
        <div className="quiz-left-section">
          {currentQuestion > 0 && (
            <FaArrowLeft
              onClick={handlePrevious}
              className="quiz-previous-button"
            />
          )}
          <h1 className="quiz-left-section-title">
            {questions[currentQuestion].question}
          </h1>
          {questions[currentQuestion].note && (
            <p className="note">{questions[currentQuestion].note}</p>
          )}
          {questions[currentQuestion].subNote && (
            <p className="subNote">{questions[currentQuestion].subNote}</p>
          )}
        </div>
        <div className="quiz-right-section">
          {questions[currentQuestion].slider ? (
            <div className="slider-container">
              <input
                onChange={handleSliderChange}
                className="quiz-slider"
                value={sliderValue}
                type="range"
                max="100"
                min="5"
              />
              <div className="slider-labels">
                <span className="quiz-slider-rate-range">₪5</span>
                <span className="quiz-slider-rate-range">₪100+</span>
              </div>
              <div className="slider-value">Budget: ₪{sliderValue}</div>
            </div>
          ) : questions[currentQuestion].type === "dropdown" ? (
            <select
              className="quiz-dropdown"
              onChange={handleOptionChange(currentQuestion)}
              value={answers[currentQuestion]}
            >
              {questions[currentQuestion].options.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          ) : (
            <div className="quiz-radio-container">
              {questions[currentQuestion].options.map((option, index) => (
                <div key={index} className="quiz-option">
                  <input
                    type="radio"
                    name="option"
                    id={`option${index}`}
                    value={option}
                    onChange={handleOptionChange(index)}
                    checked={answers[currentQuestion] === option}
                  />
                  <label htmlFor={`option${index}`}>{option}</label>
                </div>
              ))}
            </div>
          )}
          <button
            className="button-transparent"
            id="quiz-skip-button"
            onClick={handleNext}
          >
            Skip
          </button>
          <div className="quiz-continue-button-container">
            <button
              className="button-transparent"
              id="quiz-continue-button"
              onClick={handleNext}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default GetStartedQuiz;
