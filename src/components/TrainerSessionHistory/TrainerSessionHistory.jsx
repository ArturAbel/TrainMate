import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTrainers } from "../../redux/features/trainerSlice";
import "./TrainerSessionHistory.css";

const TrainerSessionHistory = () => {
  const dispatch = useDispatch();
  const trainers = useSelector((state) => state.trainer.trainers);
  const loading = useSelector((state) => state.trainer.loading);
  const error = useSelector((state) => state.trainer.error);

  const dummy = "8vYgnqL5o7sElCv6Hguf";
  const specificTrainer = trainers.find((trainer) => trainer.uid === dummy);

  useEffect(() => {
    dispatch(fetchTrainers());
  }, [dispatch]);

  return (
    <div className="trainer-session-history-container">
      <div className="content">
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        {!loading && specificTrainer && (
          <div className="approved-sessions">
            <h2>Session history</h2>
            {specificTrainer.approvedSessions.map((session, index) => (
              <div key={index} className="card">
                <div className="card-details">
                  <p>Date: {session.date}</p>
                  <p>Hour: {session.hour}</p>
                </div>
              </div>
            ))}
          </div>
        )}
        {!loading && !specificTrainer && (
          <p>Trainer with uid {dummy} not found.</p>
        )}
      </div>
    </div>
  );
};

export default TrainerSessionHistory;
