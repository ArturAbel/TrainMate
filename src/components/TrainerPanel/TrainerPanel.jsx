import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { fetchTrainers } from "../../redux/features/trainerSlice";
import LessonContainer from "../LessonContainer/LessonContainer";

import "./TrainerPanel.css";
import { approveLesson, deleteLesson } from "./TrainerPanelLib";

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
      const trainerData = trainers.find(trainer => trainer.uid === trainerId);
      if (trainerData) {
        setTrainer(trainerData);
      }
    }
  }, [trainers, trainerId]);

  if (!trainer) {
    return <div>Loading...</div>;
  }

  const pendingLessons = trainer.bookedLessons.filter(lesson => !lesson.approved);
  const approvedLessons = trainer.bookedLessons.filter(lesson => lesson.approved);

  return (
    <section className="trainer-panel-section">
      <div className="trainer-panel-containers">
        <LessonContainer
          title="Pending Lessons"
          lessons={pendingLessons}
          onApprove={(lessonId) => approveLesson(trainerId, lessonId, setTrainer, trainer)}
          onDelete={(lessonId) => deleteLesson(trainerId, lessonId, setTrainer, trainer)}
          pending={true}
        />
        <LessonContainer
          title="Approved Lessons"
          lessons={approvedLessons}
          onDelete={(lessonId) => deleteLesson(trainerId, lessonId, setTrainer, trainer)}
          pending={false}
        />
      </div>
    </section>
  );
};

export default TrainerPanel;






