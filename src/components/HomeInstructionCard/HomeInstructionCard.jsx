import "./css/HomeInstructionCard.css";
import "./css/HomeInstructionCard.tablet.css";
import "./css/HomeInstructionCard.phone.css";

export const HomeInstructionCard = ({ className, number, title, content }) => {
  return (
    <div className="home-instruction-content-container">
      <div className={`home-instruction-content ${className}`}>
        <div className="home-instruction-content-title-container">
          <div className="home-instruction-content-number">{number}</div>
          <div className="home-instruction-content-title">{title}</div>
        </div>
        <div className="home-instruction-content-text-container">
          <div className="home-instruction-content-text">{content}</div>
        </div>
      </div>
    </div>
  );
};
