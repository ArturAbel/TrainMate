import { BsHandThumbsDown, BsHandThumbsUp } from "react-icons/bs";
import { sports } from "../../utilities/constants";

import "./TrainerRegistration.css";

export const TrainerRegistration = () => {
  return (
    <section className="trainer-registration-section">
      <div className="trainer-registration-instructions-container">
        <div>
          <h1 className="trainer-registration-instructions-title">
            instructions
          </h1>
          <p className="trainer-registration-instructions-explanation">
            explanation about the process
          </p>
        </div>
        <div className="trainer-registration-instructions-dos">
          <BsHandThumbsUp />
          dos
        </div>
        <div className="trainer-registration-instructions-dos">
          <BsHandThumbsDown />
          dont&apos;s
        </div>
      </div>
      <div className="trainer-registration-form-container">
        <form action="" className="trainer-registration-form">
          <div className="trainer-registration-input-container">
            <label className="trainer-registration-form-label">
              choose your sport
            </label>
            <select className="trainer-registration-form-label" name="sport">
              {sports.map((sport, index) => (
                <option key={index} value={sport}>
                  {sport}
                </option>
              ))}
            </select>
          </div>
        </form>
      </div>
    </section>
  );
};
