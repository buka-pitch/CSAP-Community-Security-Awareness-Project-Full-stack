import { createSlice } from "@reduxjs/toolkit";

export interface currentLessonState {
  value: {
    lessonState: { currentLesson: string; courseId: string };
    numberOfLessons: number;
  };
}

const initialState: currentLessonState = {
  value: {
    lessonState: { currentLesson: "", courseId: "" },
    numberOfLessons: 0,
  },
};

export const CurrentLessonSlice = createSlice({
  name: "currentLesson",
  initialState,
  reducers: {
    setCurrentLessons: (state, action) => {
      state.value.lessonState = action.payload;
    },

    setNumberofLessons: (state, action) => {
      state.value.numberOfLessons = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCurrentLessons, setNumberofLessons } =
  CurrentLessonSlice.actions;

export default CurrentLessonSlice.reducer;
