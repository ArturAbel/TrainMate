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
  const { users } = useSelector((state) => state.users); // Correctly destructure users
  const [trainer, setTrainer] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTrainers());
    dispatch(fetchUsers()); // Fetch users when component mounts
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

  // create the time checker object
  const timeChecker = {
    date: formatDateWithHyphens(currentDate),
    hour: `${currentHour}:${currentMinute < 10 ? "0" : ""}${currentMinute}`,
    timestamp: currentDate.getTime(),
  };

  console.log("Time Checker:", timeChecker); // log the time checker

  if (!trainer) {
    return <div>Loading...</div>;
  }

  // create the all times array
  const allTimes = trainer.bookedLessons
    .filter((lesson) => lesson.approved) // Only include approved lessons
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
      };
    });

  console.log("All Times:", allTimes); // log all times

  allTimes.forEach(async (time) => {
    if (!time.approved) return; // Skip if the lesson is not approved

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

        // Update userHistory with the lesson data (without timestamp)
        const updatedUserHistory = [
          ...(user.userHistory || []),
          {
            date: time.date,
            hour: time.hour,
            trainerId,
            trainerName: trainer.displayName, // or trainer.name
            description: time.description,
          },
        ];

        await dispatch(
          updateUser(user.uid, {
            userHistory: updatedUserHistory,
          })
        );

        // Update trainer's history
        const updatedTrainerHistory = [
          ...(trainer.trainerHistory || []),
          {
            date: time.date,
            hour: time.hour,
            userId: user.uid,
            userName: user.displayName, // or user.name
            description: time.description,
          },
        ];

        await dispatch(
          updateTrainer({
            ...trainer,
            trainerHistory: updatedTrainerHistory,
          })
        );

        // Remove the lesson from bookedLessons
        const updatedLessons = trainer.bookedLessons.filter(
          (lesson) => lesson.date + lesson.hour !== time.date + time.hour
        );

        setTrainer({ ...trainer, bookedLessons: updatedLessons });
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

  console.log("Trainer's Booked Lessons:", trainer.bookedLessons);
  trainer.bookedLessons
    .filter((lesson) => lesson.approved) // Filter out unapproved lessons
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
