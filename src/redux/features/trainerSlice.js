import { createSlice } from '@reduxjs/toolkit';
import { getDatabase, ref, get } from 'firebase/database';

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
    const db = getDatabase();
    const trainersRef = ref(db, 'trainers');
    const snapshot = await get(trainersRef);
    if (snapshot.exists()) {
      dispatch(setTrainers(snapshot.val()));
    } else {
      dispatch(setTrainers([]));
    }
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setError(error.message));
    dispatch(setLoading(false));
  }
};

export default trainerSlice.reducer;
