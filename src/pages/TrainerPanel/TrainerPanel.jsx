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

  const formatDateWithHyphens = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const currentDate = new Date();
  const currentHour = currentDate.getHours();
  const currentMinute = currentDate.getMinutes();

  // create the time cheker shit
  const timeChecker = {
    date: formatDateWithHyphens(currentDate),
    hour: `${currentHour}:${currentMinute < 10 ? "0" : ""}${currentMinute}`,
    timestamp: currentDate.getTime(),
  };

  console.log("Time Checker:", timeChecker); // log the time shit

  if (!trainer) {
    return <div>Loading...</div>;
  }

  // create time all time shit
  const allTimes = trainer.bookedLessons.map((lesson) => {
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
    };
  });

  console.log("All Times:", allTimes); // kill me

  allTimes.forEach((time) => {
    if (timeChecker.timestamp > time.timestamp) {
      console.log(
        `The current time is greater than the requested time of ${time.userName}`
      );
    } else if (timeChecker.timestamp < time.timestamp) {
      console.log(
        `The current time is less than the requested time of ${time.userName}`
      );
    } else {
      console.log(
        `The current time matches the requested time of ${time.userName}`
      );
    }
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
