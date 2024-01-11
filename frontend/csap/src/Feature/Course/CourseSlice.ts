import { createSlice } from "@reduxjs/toolkit";

export interface CourseState {
  value: { id: string; title: string; description: string }[];
}

const initialState: CourseState = {
  value: [],
};

export const CourseSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCourses: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCourses } = CourseSlice.actions;

export default CourseSlice.reducer;
