import { useParams } from "react-router";
import "./TraineeLessonHistory.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchUsers } from "../../redux/features/usersSlice";
import { fetchTrainers } from "../../redux/features/trainerSlice";
import TrainerReview from "../../components/AdminTrainerCard/TrainerReview/TrainerReview";

const TraineeLessonHistory = () => {
  const { traineeId } = useParams();
  const dispatch = useDispatch();
  const {
    users,
    loading: loadingUsers,
    error: errorUsers,
  } = useSelector((state) => state.users);
  const {
    trainers,
    loading: loadingTrainers,
    error: errorTrainers,
  } = useSelector((state) => state.trainer);
  const [traineeHistory, setTraineeHistory] = useState([]);
  const [trainersData, setTrainersData] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchTrainers());
  }, [dispatch]);

  useEffect(() => {
    if (users.length > 0) {
      const traineeData = users.find((userDoc) => userDoc.uid === traineeId);
      if (traineeData) {
        setTraineeHistory(traineeData.userHistory);
      }
    }
  }, [users, traineeId]);

  useEffect(() => {
    if (trainers.length > 0) {
      const trainersMap = {};
      trainers.forEach((trainer) => {
        trainersMap[trainer.uid] = trainer;
      });
      setTrainersData(trainersMap);
    }
  }, [trainers]);

  const handleModalClick = () => {
    setIsModalOpen((prevState) => !prevState);
  };

  return (
    <section className="trainee-lesson-history-section">
      <div className="trainee-lesson-history-container">
        {loadingUsers || loadingTrainers ? (
          <div>Loading...</div>
        ) : errorUsers || errorTrainers ? (
          <div>Error loading data</div>
        ) : (
          <>
            <h1 className="lesson-history-title">Your booked lesson History</h1>
            <div className="trainee-lesson-history-items">
              {traineeHistory.map((lesson) => {
                const trainer = trainersData[lesson.trainerId];
                return (
                  <div
                    className="trainee-lesson-history-item"
                    key={`${lesson.userId}-${lesson.date}-${lesson.hour}`}
                  >
                    <div className="lesson-trainer-content">
                      {trainer ? (
                        <>
                          <img
                            src={
                              trainer.image ||
                              "/public/assets/img/anonymous/anonymous.jpeg"
                            }
                            alt={trainer.name}
                            className="lesson-trainer-image"
                          />
                          <div className="lesson-trainer-info">
                            <p>{trainer.name}</p>
                            <p>{lesson.date}</p>
                            <p>{lesson.hour}</p>
                            <p>{trainer.sport}</p>
                          </div>
                          <TrainerReview trainerId={trainer.uid} />
                        </>
                      ) : (
                        <p>Loading trainer data...</p>
                      )}
                    </div>
                    <button className="add-review-button button-transparent">
                      Add Review
                    </button>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default TraineeLessonHistory;
