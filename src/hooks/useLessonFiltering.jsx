// src/hooks/useLessonFiltering.js
import { useMemo } from "react";
import {
  getCurrentTimeChecker,
  convertTo24HourFormat,
} from "../utilities/timeUtils";

const useLessonFiltering = (trainer) => {
  const expiredLessons = useMemo(() => {
    if (!trainer) return [];
    return trainer.bookedLessons
      .filter((lesson) => lesson.approved && !lesson.movedToHistory)
      .filter((lesson) => {
        const lessonTimestamp = Date.parse(
          `${lesson.date
            .split("/")
            .reverse()
            .join("-")}T${convertTo24HourFormat(lesson.hour)}`
        );
        return getCurrentTimeChecker().timestamp > lessonTimestamp;
      });
  }, [trainer]);

  const pendingLessons = useMemo(() => {
    if (!trainer) return [];
    return trainer.bookedLessons.filter((lesson) => !lesson.approved);
  }, [trainer]);

  const approvedLessons = useMemo(() => {
    if (!trainer) return [];
    return trainer.bookedLessons.filter(
      (lesson) => lesson.approved && !lesson.movedToHistory
    );
  }, [trainer]);

  return { expiredLessons, pendingLessons, approvedLessons };
};

export default useLessonFiltering;
