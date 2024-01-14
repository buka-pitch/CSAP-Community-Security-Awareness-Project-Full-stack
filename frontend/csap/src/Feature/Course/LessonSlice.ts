import { createSlice } from "@reduxjs/toolkit";

export type LessonState = {
  id: string;
  courseId: string;
  title: string;
  description: string;
  img: string;
  createdAt: Date;
  lastSeen: Date;
};
export interface LessonsState {
  value: {
    id: string;
    courseId: string;
    title: string;
    description: string;
    img: string;
    createdAt: Date;
    lastSeen: Date;
  }[];
}

const initialState: LessonsState = {
  value: [],
};

export const CourseSlice = createSlice({
  name: "lesson",
  initialState,
  reducers: {
    setLessons: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setLessons } = CourseSlice.actions;

export default CourseSlice.reducer;
