import { createSlice } from "@reduxjs/toolkit";
import {
  collection,
  updateDoc,
  deleteDoc,
  getDocs,
  addDoc,
  doc,
} from "firebase/firestore";
import { db, storage } from "../../config/firebaseConfig";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const trainerSlice = createSlice({
  name: "trainer",
  initialState: {
    trainers: [],
    loading: false,
    error: null,
    reviewCount: 0,
  },
  reducers: {
    setTrainers: (state, action) => {
      state.trainers = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    increaseReviewCount: (state) => {
      state.favoriteCount += 1;
    },
    decreaseReviewCount: (state) => {
      state.favoriteCount -= 1;
    },
    resetReviewCount: (state) => {
      state.favoriteCount = 0;
    },
  },
});

export const {
  increaseReviewCount,
  decreaseReviewCount,
  resetReviewCount,
  setTrainers,
  setLoading,
  setError,
} = trainerSlice.actions;

export const fetchTrainers = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const trainersCollection = collection(db, "trainers");
    const trainerSnapshot = await getDocs(trainersCollection);
    const trainerList = trainerSnapshot.docs.map((doc) => {
      const trainerData = doc.data();
      const ratings = trainerData.reviews
        ? trainerData.reviews.map((review) =>review.starRating?review.starRating:0)
        : [];
      return {
        uid: doc.id,
        ...trainerData,
        ratings, 
      };
    });
    dispatch(setTrainers(trainerList));
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setError(error.message));
    dispatch(setLoading(false));
  }
};

export const addTrainer = (trainerData) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    await addDoc(collection(db, "trainers"), trainerData);
    dispatch(fetchTrainers());
    dispatch(setLoading(false));
    alert("Trainer added successfully");
  } catch (error) {
    dispatch(setError(error.message));
    dispatch(setLoading(false));
    console.error("Error adding trainer:", error);
    alert("Error adding trainer: " + error.message);
  }
};

export const updateTrainer = (trainerId, updatedData) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const trainerDoc = doc(db, "trainers", trainerId);
    await updateDoc(trainerDoc, updatedData);
    dispatch(fetchTrainers());
    dispatch(setLoading(false));
    alert("Trainer updated successfully");
  } catch (error) {
    dispatch(setError(error.message));
    dispatch(setLoading(false));
    console.error("Error updating trainer:", error);
    alert("Error updating trainer: " + error.message);
  }
};

export const uploadTrainerProfileImage =
  (file, trainerId) => async (dispatch) => {
    dispatch(setLoading(true));

    const storageRef = ref(storage, `trainers/${trainerId}/${file.name}`);
    try {
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      await updateDoc(doc(db, "trainers", trainerId), { image: downloadURL });
      dispatch(fetchTrainers());
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setError(error.message));
      dispatch(setLoading(false));
      console.error("Error uploading image:", error);
      alert("Error uploading image: " + error.message);
    }
  };

export const deleteTrainer = (trainerId) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    await deleteDoc(doc(db, "trainers", trainerId));
    dispatch(fetchTrainers());
    dispatch(setLoading(false));
    alert("Trainer was deleted successfully");
  } catch (error) {
    dispatch(setError(error.message));
    dispatch(setLoading(false));
    console.error("Error deleting trainer:", error);
    alert("Error deleting trainer: " + error.message);
  }
};

export const approveTrainer = (trainerId) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const trainerDocRef = doc(db, "trainers", trainerId);
    await updateDoc(trainerDocRef, { approved: true });
    dispatch(fetchTrainers()); // Assuming this action fetches the updated list of trainers
    dispatch(setLoading(false));
    alert("Trainer approval was successful");
  } catch (error) {
    dispatch(setError(error.message));
    dispatch(setLoading(false));
    console.error("Error approving trainer:", error);
    alert("Error approving trainer: " + error.message);
  }
};
export default trainerSlice.reducer;
