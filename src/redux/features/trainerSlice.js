import { createSlice } from '@reduxjs/toolkit';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebase';


const trainerSlice = createSlice({
  name: 'trainer',
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
    const trainersCollection = collection(db, 'trainers');
    const trainerSnapshot = await getDocs(trainersCollection);
    const trainerList = trainerSnapshot.docs.map(doc => doc.data());
    dispatch(setTrainers(trainerList));
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setError(error.message));
    dispatch(setLoading(false));
  }
};

export default trainerSlice.reducer;
