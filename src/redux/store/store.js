import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import authReducer from '../features/authSlice';
import trainerReducer from '../features/trainerSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    trainer: trainerReducer,
  },
  middleware: [thunk],
});

export default store;