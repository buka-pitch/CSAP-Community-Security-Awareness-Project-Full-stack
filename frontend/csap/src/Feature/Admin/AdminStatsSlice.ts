import { createSlice } from "@reduxjs/toolkit";

export interface AdminStatState {
  value: { usersCount: number };
}

const initialState: AdminStatState = {
  value: {
    usersCount: 0,
  },
};

export const AdminStatsSlice = createSlice({
  name: "adminStats",
  initialState,
  reducers: {
    setUserCount: (state, action) => {
      state.value.usersCount = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUserCount } = AdminStatsSlice.actions;

export default AdminStatsSlice.reducer;
