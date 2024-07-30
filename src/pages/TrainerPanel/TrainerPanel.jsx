import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import {
  fetchTrainers,
  updateTrainer,
} from "../../redux/features/trainerSlice";
import { fetchUsers, updateUser } from "../../redux/features/usersSlice";
import LessonContainer from "../../components/LessonContainer/LessonContainer";
import { approveLesson, deleteLesson } from "./TrainerPanelLib";
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

  const formatDateWithHyphens = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const getCurrentTimeChecker = () => {
    const currentDate = new Date();
    const currentHour = currentDate.getHours();
    const currentMinute = currentDate.getMinutes();

    return {
      date: formatDateWithHyphens(currentDate),
      hour: `${currentHour}:${currentMinute < 10 ? "0" : ""}${currentMinute}`,
      timestamp: currentDate.getTime(),
    };
  };

  const convertTo24HourFormat = (time) => {
    const [hour, minutePart] = time.split(":");
    const [minute, period] = minutePart.split(" ");
    let hour24 = parseInt(hour, 10);
    if (period === "PM" && hour24 !== 12) {
      hour24 += 12;
    } else if (period === "AM" && hour24 === 12) {
      hour24 = 0;
    }
    return `${hour24.toString().padStart(2, "0")}:${minute}`;
  };

  const expiredLessons = trainer
    ? trainer.bookedLessons
      .filter((lesson) => lesson.approved && !lesson.movedToHistory)
      .filter((lesson) => {
        const lessonTimestamp = Date.parse(
          `${lesson.date.split("/").reverse().join("-")}T${convertTo24HourFormat(
            lesson.hour
          )}`
        );
        return getCurrentTimeChecker().timestamp > lessonTimestamp;
      })
    : [];

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

  const pendingLessons = trainer
    ? trainer.bookedLessons.filter((lesson) => !lesson.approved)
    : [];
  const approvedLessons = trainer
    ? trainer.bookedLessons.filter(
      (lesson) => lesson.approved && !lesson.movedToHistory
    )
    : [];

  const handleApproveLesson = async (lessonId) => {
    await approveLesson(trainerId, lessonId, setTrainer, trainer);
    dispatch(fetchTrainers());
  };

  const handleDeleteLesson = async (lessonId, pending) => {
    await deleteLesson(trainerId, lessonId, setTrainer, trainer);
    dispatch(fetchTrainers());
  };

  if (!trainer) {
    return <div>Loading...</div>;
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


