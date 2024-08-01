import LessonContainer from "../../components/LessonContainer/LessonContainer";
import { fetchUsers, updateUser } from "../../redux/features/usersSlice";
import { approveLesson, deleteLesson } from "./TrainerPanelLib";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader/Loader";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import {
  fetchTrainers,
  updateTrainer,
} from "../../redux/features/trainerSlice";
import useLessonFiltering from "../../hooks/useLessonFiltering";
import {
  getCurrentTimeChecker,
  convertTo24HourFormat,
} from "../../utilities/timeUtils.jsx";

import "./TrainerPanel.css";

const TrainerPanel = () => {
  const { trainerId } = useParams();
  const dispatch = useDispatch();
  const { trainers } = useSelector((state) => state.trainer);
  const { users } = useSelector((state) => state.users);

  const [trainer, setTrainer] = useState(null);

  useEffect(() => {
    dispatch(fetchTrainers());
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    if (trainers) {
      const trainerData = trainers.find((trainer) => trainer.uid === trainerId);
      if (trainerData) {
        setTrainer(trainerData);
      }
    }
  }, [trainers, trainerId]);

  const { expiredLessons, pendingLessons, approvedLessons } =
    useLessonFiltering(trainer);

  const updateUserData = (userId, lesson) => {
    const user = users.find((user) => user.uid === userId);
    if (user) {
      const updatedHistory = [
        ...(user.userHistory || []),
        {
          date: lesson.date,
          hour: lesson.hour,
          trainerId,
          trainerName: trainer.name,
          checked: false,
        },
      ];
      const updatedNotifications = [
        ...(user.notifications || []),
        {
          message: `Your lesson with ${trainer.name} on ${lesson.date} at ${lesson.hour} has just ended.`,
          read: false,
        },
      ];
      const updatedBookedLessons = user.bookedLessons.filter(
        (userLesson) =>
          userLesson.date + userLesson.hour !== lesson.date + lesson.hour
      );

      dispatch(
        updateUser(userId, {
          userHistory: updatedHistory,
          notifications: updatedNotifications,
          bookedLessons: updatedBookedLessons,
        })
      );
    }
  };

  const updateTrainerData = (trainerId, lesson) => {
    const updatedTrainerHistory = [
      ...(trainer.trainerHistory || []),
      {
        date: lesson.date,
        hour: lesson.hour,
        userId: lesson.userId,
        userName: lesson.userName,
        checked: false,
      },
    ];
    const updatedTrainerNotifications = [
      ...(trainer.notifications || []),
      {
        message: `Lesson with ${lesson.userName} on ${lesson.date} at ${lesson.hour} has just ended.`,
        read: false,
      },
    ];
    const updatedBookedLessons = trainer.bookedLessons.filter(
      (trainerLesson) =>
        trainerLesson.date + trainerLesson.hour !== lesson.date + lesson.hour
    );

    setTrainer((prevTrainer) => ({
      ...prevTrainer,
      bookedLessons: updatedBookedLessons,
      notifications: updatedTrainerNotifications,
      trainerHistory: updatedTrainerHistory,
    }));

    dispatch(
      updateTrainer(trainerId, {
        bookedLessons: updatedBookedLessons,
        notifications: updatedTrainerNotifications,
        trainerHistory: updatedTrainerHistory,
      })
    );
  };

  useEffect(() => {
    if (trainer) {
      expiredLessons.forEach((lesson) => {
        updateUserData(lesson.userId, lesson);
        updateTrainerData(trainerId, lesson);
      });
    }
  }, [trainer, expiredLessons]);

  const handleApproveLesson = async (lessonId) => {
    await approveLesson(trainerId, lessonId, setTrainer, trainer);
    dispatch(fetchTrainers());
  };

  const handleDeleteLesson = async (lessonId, pending) => {
    await deleteLesson(trainerId, lessonId, setTrainer, trainer);
    dispatch(fetchTrainers());
  };

  if (!trainer) {
    return <Loader />;
  }

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
