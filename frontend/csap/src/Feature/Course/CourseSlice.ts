import { createSlice } from "@reduxjs/toolkit";

export interface CourseState {
  value: { title: string };
}

const initialState: CourseState = {
  value: {
    title: "",
  },
};

export const CourseSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
});

// Action creators are generated for each case reducer function
export const Reducers = CourseSlice.actions;

export default CourseSlice.reducer;
