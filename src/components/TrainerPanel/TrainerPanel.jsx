import { MdOutlineCancel, MdOutlineDone } from "react-icons/md";
import { LuMessageSquare } from "react-icons/lu";
import { IoMdInformation } from "react-icons/io";
import { useState } from "react";

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
  const [buttonLoading, setButtonLoading] = useState(false);

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

  const handleApproveLesson = async (lessonDate, lessonHour) => {
    setButtonLoading(true);
    if (specificTrainer) {
      const lessonIndex = specificTrainer.bookedLessons.findIndex(
        (lesson) => lesson.date === lessonDate && lesson.hour === lessonHour
      );

      if (lessonIndex === -1) {
        console.error("Lesson not found in bookedLessons");
        setButtonLoading(false);
        return;
      }

      const updatedBookedLessons = specificTrainer.bookedLessons.map(
        (l, index) => (index === lessonIndex ? { ...l, approved: true } : l)
      );
      const updatedApprovedSessions = [
        ...specificTrainer.approvedSessions,
        { date: lessonDate, hour: lessonHour },
      ];
      const updatedData = {
        bookedLessons: updatedBookedLessons,
        approvedSessions: updatedApprovedSessions,
      };
      await dispatch(updateTrainer(specificTrainer.uid, updatedData));
      filterBookedLessons(updatedBookedLessons);
      setButtonLoading(false);
    }
  };

  return (
    <section className="trainer-panel-section">
      <div className="trainer-panel-containers">
        <div className="trainer-panel-pending-container">
          <h2 className="trainer-panel-container-title">Pending Sessions</h2>
          <div className="trainer-panel-cards-container">
            {pendingSessions.map((session) => (
              <div key={session.id} className="trainer-panel-user-card">
                <div className="trainer-panel-card-image-container">
                  <img
                    className="trainer-panel-card-image"
                    src={session.imageUrl}
                    alt="owner"
                  />
                </div>
                <div className="trainer-panel-card-details">
                  <p>time request sent</p>
                  <p>{session.name}</p>
                  <p>requested date:{session.date}</p>
                  <p>requested time</p>
                  <LuMessageSquare className="trainer-panel-button-icon card-icon-message" />
                </div>
                <div className="trainer-panel-card-icons">
                  <div className="trainer-panel-card-icons-top">
                    <IoMdInformation className="trainer-panel-button-icon" />
                  </div>
                  <div className="trainer-panel-card-icons-bottom">
                    <MdOutlineCancel className="trainer-panel-button-icon" />
                    <MdOutlineDone
                      className="trainer-panel-button-icon"
                      onClick={() => handleMoveToBooked(session.id)}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="trainer-panel-approved-container">
          <h2 className="trainer-panel-container-title">Booked Sessions</h2>
          <div className="trainer-panel-cards-container">
            {bookedSessions.map((session) => (
              <div key={session.id} className="trainer-panel-user-card">
                <div className="trainer-panel-card-image-container">
                  <img
                    className="trainer-panel-card-image"
                    src={session.imageUrl}
                    alt="owner"
                  />
                </div>
                <div className="card-details">
                  <p>Name: {session.name}</p>
                  <p>Date: {session.date}</p>
                  <button
                    className="move-button"
                    onClick={() => handleMoveToPending(session.id)}
                  >
                    Move to Pending
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrainerPanel;
