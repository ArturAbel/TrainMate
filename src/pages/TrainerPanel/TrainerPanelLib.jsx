import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../config/firebaseConfig";

export const approveLesson = async (
  trainerId,
  lessonId,
  setTrainer,
  trainer
) => {
  const trainerRef = doc(db, "trainers", trainerId);
  const trainerDoc = await getDoc(trainerRef);
  if (trainerDoc.exists()) {
    const trainerData = trainerDoc.data();
    const lessonToApprove = trainerData.bookedLessons.find(
      (lesson) => lesson.date + lesson.hour === lessonId
    );
    const updatedLessons = trainerData.bookedLessons.map((lesson) =>
      lesson.date + lesson.hour === lessonId
        ? { ...lesson, approved: true, movedToHistory: false }
        : lesson
    );
    await updateDoc(trainerRef, { bookedLessons: updatedLessons });

    const userRef = doc(db, "users", lessonToApprove.userId);
    const userDoc = await getDoc(userRef);
    if (userDoc.exists()) {
      const userData = userDoc.data();
      const updatedUserLessons = userData.bookedLessons.map((lesson) =>
        lesson.date + lesson.hour === lessonId
          ? { ...lesson, approved: true, movedToHistory: false }
          : lesson
      );
      await updateDoc(userRef, { bookedLessons: updatedUserLessons });
    }

    setTrainer({ ...trainer, bookedLessons: updatedLessons });
  }
};

export const deleteLesson = async (
  trainerId,
  lessonId,
  setTrainer,
  trainer
) => {
  console.log(`Deleting lesson ${lessonId} for trainer ${trainerId}`);
  const trainerRef = doc(db, "trainers", trainerId);
  const trainerDoc = await getDoc(trainerRef);
  if (trainerDoc.exists()) {
    const trainerData = trainerDoc.data();
    const lessonToDelete = trainerData.bookedLessons.find(
      (lesson) => lesson.date + lesson.hour === lessonId
    );
    const updatedLessons = trainerData.bookedLessons.filter(
      (lesson) => lesson.date + lesson.hour !== lessonId
    );

    await updateDoc(trainerRef, { bookedLessons: updatedLessons });

    const userRef = doc(db, "users", lessonToDelete.userId);
    const userDoc = await getDoc(userRef);
    if (userDoc.exists()) {
      const userData = userDoc.data();
      const updatedUserLessons = userData.bookedLessons.filter(
        (lesson) => lesson.date + lesson.hour !== lessonId
      );
      await updateDoc(userRef, { bookedLessons: updatedUserLessons });
    }

    setTrainer({ ...trainer, bookedLessons: updatedLessons });
    console.log(`Deleted lesson ${lessonId} for trainer ${trainerId}`);
  }
};


