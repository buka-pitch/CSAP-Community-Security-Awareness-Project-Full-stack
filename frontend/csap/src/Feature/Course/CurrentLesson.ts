import { createSlice } from "@reduxjs/toolkit";

export interface currentLessonState {
  value: {
    currentLesson: string;
    courseId: string;
  };
}

const initialState: currentLessonState = {
  value: { currentLesson: "", courseId: "" },
};

export const CurrentLessonSlice = createSlice({
  name: "currentLesson",
  initialState,
  reducers: {
    setCurrentLessons: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCurrentLessons } = CurrentLessonSlice.actions;

export default CurrentLessonSlice.reducer;
