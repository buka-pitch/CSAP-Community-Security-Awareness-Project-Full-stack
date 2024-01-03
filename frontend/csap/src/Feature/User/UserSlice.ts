import { createSlice } from "@reduxjs/toolkit";

export interface UserState {
  value: {
    isAuthenticated: boolean;
    user: {
      id: string;
      Name: string;
      Email: string;
      Emailverified: boolean;
      Role: string;
      Rateing: number | undefined;
      chatId: number | undefined;
      createdAt: Date | undefined;
      updatedAt: Date | undefined;
      data: object | undefined;
    };
  };
}

const initialState: UserState = {
  value: {
    isAuthenticated: false,
    user: {
      id: "",
      Name: "",
      Email: "",
      Emailverified: false,
      Role: "",
      Rateing: undefined,
      chatId: undefined,
      createdAt: undefined,
      updatedAt: undefined,
      data: undefined,
    },
  },
};

export const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.value.user = action.payload;
    },
    setIsAuthenticated: (state, action) => {
      state.value.isAuthenticated = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser, setIsAuthenticated } = UserSlice.actions;

export default UserSlice.reducer;
