import  { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./GetStartedQuiz.css";


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
    type: "dropdown", // Adding type to specify dropdown
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
  const navigate = useNavigate();

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      navigate("/trainers"); // Navigate to /trainers path
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

  return (
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
              max="135"
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
          <select className="dropdown">
            {questions[currentQuestion].options.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        ) : (
          questions[currentQuestion].options.map((option, index) => (
            <div key={index} className="option">
              <input type="radio" name="option" id={`option${index}`} />
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
  );
};

export default GetStartedQuiz;
