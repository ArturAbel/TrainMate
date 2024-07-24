import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./GetStartedQuiz.css";
import { useDispatch, useSelector } from "react-redux";
import { updateAnswer } from "../../redux/features/quizSlice";
import QuizLoadingModal from "../QuizLoadingModal/QuizLoadingModal";


const questions = [
  {
    question: "I want to Learn",
    options: [
      "Add All",
      "Tennis",
      "Boxing",
      "Swimming",
      "BodyBuilding",
      "Basketball",
      "Soccer",
    ],
    type: "dropdown",
  },
  {
    question: "What's your level?",
    options: ["Beginner", "Intermediate", "Advanced", "Expert", "Master"],
  },
  {
    question: "Looking for a specific culture or accent?",
    options: [
      "Jerusalem",
      "Haifa",
      "Tel-Aviv",
      "Eliat",
      "Kfar-Saba",
      "Migdal-Haemek",
      "Rishon-Lezion",
      "Afula",
    ],
    showAll: true,
  },
  {
    question: "What's your budget per lesson?",
    options: ["₪5 - ₪135+"],
    slider: true,
  },
];

const GetStartedQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [sliderValue, setSliderValue] = useState(70);
  const [isLoadingModalOpen, setIsLoadingModalOpen] = useState(false);
  const answers = useSelector((state) => state.quiz.answers);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleNext = () => {
    if (questions[currentQuestion].slider) {
      dispatch(updateAnswer({index: currentQuestion, answer: `${sliderValue}`}));
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

  const handleOptionChange = (index) => (event) => {
    dispatch(updateAnswer({ index: currentQuestion, answer: event.target.value }));
  };

  return (
    <>
    {isLoadingModalOpen && <QuizLoadingModal/>}
    <div className="test-container">
      <div className="left-section">
        {currentQuestion > 0 && (
          <button className="previous-button" onClick={handlePrevious}>
            ←
          </button>
        )}
        <h1>{questions[currentQuestion].question}</h1>
        {questions[currentQuestion].note && (
          <p className="note">{questions[currentQuestion].note}</p>
        )}
        {questions[currentQuestion].subNote && (
          <p className="subNote">{questions[currentQuestion].subNote}</p>
        )}
      </div>
      <div className="right-section">
        {questions[currentQuestion].slider ? (
          <div className="slider-container">
            <input
              type="range"
              min="5"
              max="100"
              value={sliderValue}
              onChange={handleSliderChange}
              className="slider"
            />
            <div className="slider-labels">
              <span>₪5</span>
              <span>₪135+</span>
            </div>
            <div className="slider-value">Price: ₪{sliderValue}</div>
            <p className="note">
              Your first trial lesson is free. Prices are filtered for our
              standard 50-min lessons after trial.
            </p>
          </div>
        ) : questions[currentQuestion].type === "dropdown" ? (
          <select
            className="dropdown"
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
          questions[currentQuestion].options.map((option, index) => (
            <div key={index} className="option">
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
          ))
        )}
        {questions[currentQuestion].showAll && (
          <button className="show-all">Show all</button>
        )}
        <button className="skip-button" onClick={handleNext}>
          Skip
        </button>
        <button className="continue-button" onClick={handleNext}>
          Continue
        </button>
      </div>
    </div>
    </>
  );
};

export default GetStartedQuiz;

