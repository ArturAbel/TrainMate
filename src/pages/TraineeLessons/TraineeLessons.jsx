import { useParams } from "react-router";
import "./TraineeLessons.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchUsers } from "../../redux/features/usersSlice";
import { fetchTrainers } from "../../redux/features/trainerSlice";
import TrainerReview from "../../components/TrainerReview/TrainerReview";

const TraineeLessons = () => {
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
  const [bookedLessons, setBookedLessons] = useState([]);
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
        setBookedLessons(traineeData.bookedLessons);
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
    <section className="trainee-lessons">
      <div className="trainee-in-progress-lessons-container">
        <h1 className="lesson-container-title">Your in-progress lessons</h1>
        <div className="trainee-lesson-history-items">
          {bookedLessons.map((lesson) => {
            const trainer = trainersData[lesson.trainerId];
            return (
              <div
                className="trainee-lesson-item"
                key={`${lesson.trainerId}-${lesson.date}-${lesson.hour}`}
              >
              <div
                className="trainee-lesson-item"
                key={`${lesson.trainerId}-${lesson.date}-${lesson.hour}`}
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
                      <div
                        className={`lesson-status ${
                          lesson.approved && "approved"
                        }`}
                      >
                      <div
                        className={`lesson-status ${
                          lesson.approved && "approved"
                        }`}
                      >
                        {lesson.approved ? "Approved" : "Pending"}
                      </div>
                    </>
                  ) : (
                    <p>Loading trainer data...</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="trainee-lesson-history-container">
        {loadingUsers || loadingTrainers ? (
          <div>Loading...</div>
        ) : errorUsers || errorTrainers ? (
          <div>Error loading data</div>
        ) : (
          <>
            <h1 className="lesson-container-title">
              Your booked lesson History
            </h1>
            <div className="trainee-lesson-history-items">
              {traineeHistory.map((lesson) => {
                const trainer = trainersData[lesson.trainerId];
                return (
                  <div
                    className="trainee-lesson-item"
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
                          {isModalOpen && (
                            <TrainerReview
                              setIsModalOpen={setIsModalOpen}
                              trainerId={trainer.uid}
                            />
                          )}
                        </>
                      ) : (
                        <p>Loading trainer data...</p>
                      )}
                    </div>
                    <button
                      className="add-review-button button-transparent"
                      onClick={handleModalClick}
                    >
                    <button
                      className="add-review-button button-transparent"
                      onClick={handleModalClick}
                    >
                      {isModalOpen ? "Close Review" : "Add Review"}
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

export default TraineeLessons;
