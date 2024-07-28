import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import {
  fetchTrainers,
  updateTrainer,
} from "../../redux/features/trainerSlice";
import LessonContainer from "../../components/LessonContainer/LessonContainer";
import { approveLesson, deleteLesson } from "./TrainerPanelLib";
import "./TrainerPanel.css";

const TrainerPanel = () => {
  const { trainerId } = useParams();
  const { trainers } = useSelector((state) => state.trainer);
  const [trainer, setTrainer] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTrainers());
  }, [dispatch]);

  useEffect(() => {
    if (trainers) {
      const trainerData = trainers.find((trainer) => trainer.uid === trainerId);
      if (trainerData) {
        setTrainer(trainerData);
      }
    }
  }, [trainers, trainerId]);

  if (!trainer) {
    return <div>Loading...</div>;
  }

  const pendingLessons = trainer.bookedLessons.filter(
    (lesson) => !lesson.approved
  );
  const approvedLessons = trainer.bookedLessons.filter(
    (lesson) => lesson.approved
  );

  const handleApproveLesson = async (lessonId) => {
    await approveLesson(trainerId, lessonId, setTrainer, trainer);
    dispatch(fetchTrainers());
  };

  const handleDeleteLesson = async (lessonId, pending) => {
    await deleteLesson(trainerId, lessonId, setTrainer, trainer);
    dispatch(fetchTrainers());
  };

  return (
    <section className="trainer-panel-section">
      <div className="trainer-panel-containers">
        <LessonContainer
          title="Pending Lessons"
          lessons={pendingLessons}
          onApprove={handleApproveLesson}
          onDelete={(lessonId) => handleDeleteLesson(lessonId, true)}
          pending={true}
        />
        <LessonContainer
          title="Approved Lessons"
          lessons={approvedLessons}
          onDelete={(lessonId) => handleDeleteLesson(lessonId, false)}
          pending={false}
        />
      </div>
    </section>
  );
};

export default TrainerPanel;
