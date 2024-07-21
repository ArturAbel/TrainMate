import trainerReducer from "../features/trainerSlice";
import usersReducer from '../features/usersSlice';
import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../features/authSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    trainer: trainerReducer,
    users: usersReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default store;
