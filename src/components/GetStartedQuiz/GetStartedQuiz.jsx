import { useState } from "react";
import "./GetStartedQuiz.css";

const questions = [
  {
    question: "What is your goal?",
    options: [
      "Career and business",
      "Lessons for kids",
      "Exams and course work",
      "Culture, travel and hobby",
    ],
  },
  {
    question: "What's your English level?",
    options: [
      "I'm just starting",
      "I know the basics",
      "I'm conversational",
      "I'm fluent in most situations",
    ],
  },
  {
    question: "Looking for a specific culture or accent?",
    note: "You can select multiple options",
    subNote: "Only English native speakers",
    options: [
      "United States of America",
      "Israel",
      "United Kingdom",
      "Ukraine",
      "South Africa",
    ],
    showAll: true,
  },
  {
    question: "Any specific interests?",
    note: "You can select multiple options",
    subNote: "Popular",
    options: [
      "English job interview prep",
      "Conversational English",
      "American English",
      "English for beginners",
      "English for children",
    ],
    showAll: true,
  },
  {
    question: "When can you take lessons?",
    note: "You can select multiple options",
    options: [
      "Daytime 9-12",
      "Daytime 12-15",
      "Daytime 15-18",
      "Evening and night 18-21",
      "Evening and night 21-24",
      "Morning 3-6",
      "Morning 6-9",
    ],
    days: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  },
  {
    question: "What's your budget per lesson?",
    options: ["₪5 - ₪135+"],
    note: "Your first trial lesson is free. Prices are filtered for our standard 50-min lessons after trial.",
    slider: true,
  },
];

const GetStartedQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      alert("Test completed");
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  return (
    <div className="test-container">
      <div className="left-section">
        <h1>{questions[currentQuestion].question}</h1>
        {questions[currentQuestion].note && (
          <p className="note">{questions[currentQuestion].note}</p>
        )}
        {questions[currentQuestion].subNote && (
          <p className="subNote">{questions[currentQuestion].subNote}</p>
        )}
      </div>
      <div className="right-section">
        {questions[currentQuestion].options.map((option, index) => (
          <div key={index} className="option">
            <input type="radio" name="option" id={`option${index}`} />
            <label htmlFor={`option${index}`}>{option}</label>
          </div>
        ))}
        {questions[currentQuestion].showAll && (
          <button className="show-all">Show all</button>
        )}
        <button className="skip-button" onClick={handleNext}>
          Skip
        </button>
        <button className="continue-button" onClick={handleNext}>
          Continue
        </button>
        {currentQuestion > 0 && (
          <button className="previous-button" onClick={handlePrevious}>
            ←
          </button>
        )}
      </div>
    </div>
  );
};

export default GetStartedQuiz;
