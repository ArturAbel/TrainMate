import TrainerReview from "../../components/TrainerReview/TrainerReview";
import { fetchTrainers } from "../../redux/features/trainerSlice";
import { fetchUsers } from "../../redux/features/usersSlice";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader/Loader";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

import "./TraineeLessons.css";

const TraineeLessons = () => {
  const { traineeId } = useParams();
  const dispatch = useDispatch();
  const {
    loading: loadingUsers,
    error: errorUsers,
    users,
  } = useSelector((state) => state.users);

  const {
    loading: loadingTrainers,
    error: errorTrainers,
    trainers,
  } = useSelector((state) => state.trainer);

  const { loading: loadingAuth } = useSelector((state) => state.auth);
  const [traineeHistory, setTraineeHistory] = useState([]);
  const [bookedLessons, setBookedLessons] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [trainersData, setTrainersData] = useState({});

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
    <>
      {loadingUsers || loadingTrainers || loadingAuth ? (
        <Loader />
      ) : (
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
                    <div className="lesson-trainer-content">
                      {trainer ? (
                        <>
                          <img
                            className="lesson-trainer-image"
                            src={
                              trainer.image ||
                              "/public/assets/img/anonymous/anonymous.jpeg"
                            }
                            alt={trainer.name}
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
                            {lesson.approved ? "Approved" : "Pending"}
                          </div>
                        </>
                      ) : null}{" "}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="trainee-lesson-history-container">
            {errorUsers || errorTrainers ? (
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
                                className="lesson-trainer-image"
                                src={
                                  trainer.image ||
                                  "/public/assets/img/anonymous/anonymous.jpeg"
                                }
                                alt={trainer.name}
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
                          ) : null}{" "}
                        </div>
                        <button
                          className="button-transparent"
                          onClick={handleModalClick}
                          id="add-review-button"
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
      )}
    </>
  );
};

export default TraineeLessons;
