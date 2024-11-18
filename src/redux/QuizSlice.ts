import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Option {
    text: string;
    isCorrect: boolean;
  }
  
  interface Quiz {
    question: string;
    options: Option[];
  }
interface QuizState {
  lessonTitle: string | null;
  quizzes: Quiz[] | null;
}

const initialState: QuizState = {
  lessonTitle: '',
  quizzes: [],
};

const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    setQuizData(state, action: PayloadAction<{ lessonTitle: string; quizzes: Quiz[] }>) {
      state.lessonTitle = action.payload.lessonTitle;
      state.quizzes = action.payload.quizzes;
    },
    clearQuizData(state) {
      state.lessonTitle = null;
      state.quizzes = null;
    },
  },
});

export const { setQuizData, clearQuizData } = quizSlice.actions;
export default quizSlice.reducer;
