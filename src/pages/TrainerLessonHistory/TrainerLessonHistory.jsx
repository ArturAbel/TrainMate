import { fetchTrainers } from "../../redux/features/trainerSlice";
import { fetchUsers } from "../../redux/features/usersSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

import "./css/TrainerLessonHistory.css";
import "./css/TrainerLessonHistory.phone.css";

const TrainerLessonHistory = () => {
  const dispatch = useDispatch();
  const {
    trainers,
    loading: loadingTrainers,
    error: errorTrainers,
  } = useSelector((state) => state.trainer);
  const {
    users,
    loading: loadingUsers,
    error: errorUsers,
  } = useSelector((state) => state.users);
  const [trainerData, setTrainerData] = useState(null);
  const { trainerId } = useParams();

  useEffect(() => {
    dispatch(fetchTrainers());
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    if (trainers.length > 0) {
      const trainerData = trainers.find((trainer) => trainer.uid === trainerId);
      if (trainerData) {
        setTrainerData(trainerData);
      }
    }
  }, [trainers, trainerId]);

  if (errorTrainers || errorUsers) {
    return <div>Error loading data</div>;
  }

  if (!trainerData || !trainerData.trainerHistory) {
    return <div>No session history found</div>;
  }

  const getUserName = (userId) => {
    const user = users.find((user) => user.uid === userId);
    return user ? user.displayName : "Unknown User";
  };

  return (
    <>
      <section className="trainer-lesson-history-section">
        <div className="trainer-lesson-history-container">
          <h1 className="lesson-history-title">Session History</h1>
          <div className="trainer-lesson-history-items">
            {trainerData.trainerHistory.map((lesson) => (
              <div
                className="trainer-lesson-history-item"
                key={`${trainerId}-${lesson.date}-${lesson.hour}`}
              >
                <div className="lesson-session-content">
                  <div className="lesson-session-info">
                    <p>Date: {lesson.date}</p>
                    <p>Hour: {lesson.hour}</p>
                    <p>User: {getUserName(lesson.userId)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default TrainerLessonHistory;
