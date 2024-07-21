import trainerReducer from "../features/trainerSlice";
import { configureStore } from "@reduxjs/toolkit";
// import authReducer from '../features/authSlice';

const store = configureStore({
  reducer: {
    // auth: authReducer,
    trainer: trainerReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default store;
