import trainerReducer from "../features/trainerSlice";
import usersReducer from '../features/usersSlice';
import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../features/authSlice';
import quizReducer from '../features/quizSlice';
import messagesReducer from '../features/messagesSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    trainer: trainerReducer,
    users: usersReducer,
    quiz: quizReducer,
    messages: messagesReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default store;
