import { ALT_IMAGE, APPROVED, PENDING } from "../../utilities/constants";
import { MdOutlineCancel, MdOutlineDone } from "react-icons/md";
import { LuMessageSquare } from "react-icons/lu";

import "./css/LessonContainer.css";
import "./css/LessonContainer.phone.css";
const LessonContainer = ({ title, lessons, onApprove, onDelete, pending }) => {
  return (
    <section
      className={`trainer-panel-${pending ? PENDING : APPROVED}-container`}
    >
      <h2 className="trainer-panel-container-title">{title}</h2>
      <div className="trainer-panel-cards-container">
        {lessons.length > 0 ? (
          lessons.map((lesson) => (
            <div
              key={lesson.date + lesson.hour}
              className={`trainer-panel-user-card ${
                pending !== PENDING ? `${APPROVED}-cards` : ""
              }`}
            >
              <div className="trainer-panel-card-details">
                <div className="trainer-panel-card-image-container">
                  <img
                    className="trainer-panel-card-image"
                    src={lesson.userImage}
                    alt={ALT_IMAGE}
                  />
                </div>
                <div className="trainer-panel-card-content">
                  <p className="trainer-panel-card-content-item">
                    Name: {lesson.userName}
                  </p>
                  <p className="trainer-panel-card-content-item">
                    requested date: {lesson.date}
                  </p>
                  <p className="trainer-panel-card-content-item">
                    requested time: {lesson.hour}
                  </p>
                  <LuMessageSquare className="trainer-panel-button-icon card-icon-message" />
                </div>
              </div>
              <div className="trainer-panel-card-icons">
                <MdOutlineCancel
                  className="trainer-panel-button-icon"
                  onClick={() => onDelete(lesson.date + lesson.hour)}
                />
                {pending && (
                  <MdOutlineDone
                    className="trainer-panel-button-icon"
                    onClick={() => onApprove(lesson.date + lesson.hour)}
                  />
                )}
              </div>
            </div>
          ))
        ) : (
          <h2 className="trainer-panel-no-lessons-title">
            No {pending ? PENDING : APPROVED} lessons
          </h2>
        )}
      </div>
    </section>
  );
};

export default LessonContainer;
