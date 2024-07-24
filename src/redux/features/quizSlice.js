import { createSlice } from "@reduxjs/toolkit";

export const quizSlice = createSlice({
  name: "quiz",
  initialState: {
    answers: [],
  },
  reducers: {
    setAnswers: (state, action) => {
      state.answers = action.payload;
    },
    updateAnswer: (state, action) => {
      const { index, answer } = action.payload;
      state.answers[index] = answer;
    }
  }
});

export const { setAnswers, updateAnswer } = quizSlice.actions;

export default quizSlice.reducer;