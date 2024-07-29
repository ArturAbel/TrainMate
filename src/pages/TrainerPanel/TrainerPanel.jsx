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
import { fetchUsers, updateUser } from "../../redux/features/usersSlice.js";

const TrainerPanel = () => {
  const { trainerId } = useParams();
  const { trainers } = useSelector((state) => state.trainer);
  const { users } = useSelector((state) => state.users);
  const [trainer, setTrainer] = useState(null);
  const dispatch = useDispatch();

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

  const currentDate = new Date();
  const currentHour = currentDate.getHours();
  const currentMinute = currentDate.getMinutes();

  const timeChecker = {
    date: formatDateWithHyphens(currentDate),
    hour: `${currentHour}:${currentMinute < 10 ? "0" : ""}${currentMinute}`,
    timestamp: currentDate.getTime(),
  };

  console.log("Time Checker:", timeChecker);

  if (!trainer) {
    return <div>Loading...</div>;
  }

  let allTimes = trainer.bookedLessons
    .filter((lesson) => lesson.approved)
    .map((lesson) => {
      const lessonTimestamp = Date.parse(
        `${lesson.date.split("/").reverse().join("-")}T${convertTo24HourFormat(
          lesson.hour
        )}`
      );
      return {
        timestamp: lessonTimestamp,
        date: lesson.date.split("/").reverse().join("-"),
        hour: lesson.hour,
        userName: lesson.userName,
        userId: lesson.userId,
        approved: lesson.approved,
        movedToHistory: lesson.movedToHistory || false,
      };
    });

  console.log("All Times:", allTimes);

  let userUpdates = {};

  allTimes.forEach((time) => {
    if (!time.approved || time.movedToHistory) return;

    if (timeChecker.timestamp > time.timestamp) {
      console.log(
        `The current time is greater than the requested time of ${time.userName} (User ID: ${time.userId})`
      );
      const user = users.find((user) => user.uid === time.userId);
      if (user) {
        console.log(
          `User Booked Lessons for ${time.userName}:`,
          user.bookedLessons
        );

        if (!userUpdates[time.userId]) {
          userUpdates[time.userId] = {
            userHistory: [...(user.userHistory || [])],
            notifications: [...(user.notifications || [])],
            updatedLessons: trainer.bookedLessons.map((lesson) =>
              lesson.date + lesson.hour === time.date + time.hour
                ? { ...lesson, movedToHistory: true }
                : lesson
            ),
            trainerNotifications: [
              ...(trainer.notifications || []),
              {
                message: `Lesson with ${time.userName} on ${time.date} at ${time.hour} has just ended.`,
                read: false,
              },
            ],
            trainerHistory: [
              ...(trainer.trainerHistory || []),
              {
                date: time.date,
                hour: time.hour,
                userId: time.userId,
                userName: time.userName,
                checked: false,
              },
            ],
          };
        }

        userUpdates[time.userId].userHistory.push({
          date: time.date,
          hour: time.hour,
          trainerId,
          trainerName: trainer.name,
          checked: false,
        });

        userUpdates[time.userId].notifications.push({
          message: `Your lesson with ${trainer.name} on ${time.date} at ${time.hour} has just ended.`,
          read: false,
        });

        userUpdates[time.userId].trainerHistory.push({
          date: time.date,
          hour: time.hour,
          userId: time.userId,
          userName: time.userName,
          checked: false,
        });
      } else {
        console.log(`User with ID ${time.userId} not found.`);
      }
    } else if (timeChecker.timestamp < time.timestamp) {
      console.log(
        `The current time is less than the requested time of ${time.userName} (User ID: ${time.userId})`
      );
    } else {
      console.log(
        `The current time matches the requested time of ${time.userName} (User ID: ${time.userId})`
      );
    }
  });

  // Dispatch updates for all users
  for (const userId in userUpdates) {
    const {
      userHistory,
      updatedLessons,
      notifications: userNotifications,
      trainerNotifications,
      trainerHistory,
    } = userUpdates[userId];
    dispatch(
      updateUser(userId, {
        userHistory,
        notifications: userNotifications,
      })
    );

    console.log("Updated User History for userId:", userId, userHistory);
    console.log(
      "Updated User Notifications for userId:",
      userId,
      userNotifications
    );

    setTrainer((prevTrainer) => ({
      ...prevTrainer,
      bookedLessons: updatedLessons,
      notifications: trainerNotifications,
      trainerHistory,
    }));

    // Dispatch update for trainer to update booked lessons, notifications, and history
    dispatch(
      updateTrainer(trainerId, {
        bookedLessons: updatedLessons,
        notifications: trainerNotifications,
        trainerHistory,
      })
    );

    console.log("Updated Trainer History for userId:", userId, trainerHistory);
  }

  console.log("Trainer's Booked Lessons:", trainer.bookedLessons);
  trainer.bookedLessons
    .filter((lesson) => lesson.approved)
    .forEach((lesson) => {
      users.forEach((user) => {
        if (lesson.userId === user.uid) {
          console.log(`Lesson for User ID ${user.uid}:`, lesson);
        }
      });
    });

  const pendingLessons = trainer.bookedLessons.filter(
    (lesson) => !lesson.approved
  );
  const approvedLessons = trainer.bookedLessons.filter(
    (lesson) => lesson.approved && !lesson.movedToHistory
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

export default TrainerPanel;
