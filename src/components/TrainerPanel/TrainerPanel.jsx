import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTrainers,
  updateTrainer,
} from "../../redux/features/trainerSlice";
import "./TrainerPanel.css";

const TrainerPanel = () => {
  const dispatch = useDispatch();
  const trainers = useSelector((state) => state.trainer.trainers);
  const loading = useSelector((state) => state.trainer.loading);
  const error = useSelector((state) => state.trainer.error);
  const user = useSelector((state) => state.auth.user);

  const dummy = "8vYgnqL5o7sElCv6Hguf";
  const specificTrainer = trainers.find((trainer) => trainer.uid === dummy);

  const [filteredBookedLessons, setFilteredBookedLessons] = useState([]);

  useEffect(() => {
    dispatch(fetchTrainers());
  }, [dispatch]);

  useEffect(() => {
    if (!loading && trainers.length > 0 && specificTrainer) {
      console.log(specificTrainer);
      filterBookedLessons(specificTrainer.bookedLessons);
    } else if (!loading && trainers.length > 0) {
      console.log(`Trainer with uid ${dummy} not found.`);
    }
  }, [loading, trainers, specificTrainer]);

  const filterBookedLessons = (lessons) => {
    const filtered = lessons.filter((lesson) => !lesson.approved);
    setFilteredBookedLessons(filtered);
  };

  const handleApproveLesson = (lessonIndex) => {
    if (specificTrainer) {
      const lesson = specificTrainer.bookedLessons[lessonIndex];
      const updatedBookedLessons = specificTrainer.bookedLessons.map(
        (l, index) => (index === lessonIndex ? { ...l, approved: true } : l)
      );
      const updatedApprovedSessions = [
        ...specificTrainer.approvedSessions,
        { date: lesson.date, hour: lesson.hour },
      ];
      const updatedData = {
        bookedLessons: updatedBookedLessons,
        approvedSessions: updatedApprovedSessions,
      };
      dispatch(updateTrainer(specificTrainer.uid, updatedData));
      filterBookedLessons(updatedBookedLessons);
    }
  };

  return (
    <div className="trainer-panel-container">
      <div className="content">
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        {!loading && specificTrainer && (
          <>
            <div className="left-content">
              <h2>Booked Lessons</h2>
              {filteredBookedLessons.map((lesson, index) => (
                <div key={index} className="card">
                  <div className="card-details">
                    <p>Date: {lesson.date}</p>
                    <p>Hour: {lesson.hour}</p>
                    <p>Approved: {lesson.approved ? "Yes" : "No"}</p>
                    {!lesson.approved && (
                      <button onClick={() => handleApproveLesson(index)}>
                        Approve seassion
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="right-content">
              <h2>Approved Sessions</h2>
              {specificTrainer.approvedSessions.map((session, index) => (
                <div key={index} className="card">
                  <div className="card-details">
                    <p>Date: {session.date}</p>
                    <p>Hour: {session.hour}</p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
      {user && (
        <div className="user-info">
          <h3>Current User ID: {user.uid}</h3>
        </div>
      )}
    </div>
  );
};

export default TrainerPanel;
