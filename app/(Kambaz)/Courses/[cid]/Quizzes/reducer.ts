import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Quiz } from "../../../Database";

interface QuizzesState {
  quizzes: Quiz[];
}

const initialState: QuizzesState = {
  quizzes: [],
};

const quizzesSlice = createSlice({
  name: "quizzes",
  initialState,
  reducers: {
    setQuizzes: (state, action: PayloadAction<Quiz[]>) => {
      state.quizzes = action.payload;
    },
    addQuiz: (state, action: PayloadAction<Quiz>) => {
      state.quizzes.push(action.payload);
    },
    deleteQuiz: (state, action: PayloadAction<string>) => {
      state.quizzes = state.quizzes.filter((q) => q._id !== action.payload);
    },
    updateQuiz: (state, action: PayloadAction<Quiz>) => {
      state.quizzes = state.quizzes.map((q) =>
        q._id === action.payload._id ? action.payload : q
      );
    },
    togglePublish: (state, action: PayloadAction<string>) => {
      state.quizzes = state.quizzes.map((q) =>
        q._id === action.payload ? { ...q, published: !q.published } : q
      );
    },
  },
});

export const { setQuizzes, addQuiz, deleteQuiz, updateQuiz, togglePublish } =
  quizzesSlice.actions;

export default quizzesSlice.reducer;

