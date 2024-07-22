import { createSlice } from "@reduxjs/toolkit";
import { collection, getDocs, addDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../../config/firebaseConfig";

const trainerSlice = createSlice({
  name: "trainer",
  initialState: {
    trainers: [],
    loading: false,
    error: null,
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
  },
});

export const { setTrainers, setLoading, setError } = trainerSlice.actions;

export const fetchTrainers = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const trainersCollection = collection(db, "trainers");
    const trainerSnapshot = await getDocs(trainersCollection);
    const trainerList = trainerSnapshot.docs.map((doc) => doc.data());
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

export default trainerSlice.reducer;
