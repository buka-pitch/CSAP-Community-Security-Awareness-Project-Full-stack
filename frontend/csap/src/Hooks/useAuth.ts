import axios from "../Utils/axiosInstance";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../Feature/store";
import {
  logoutUser,
  setIsAuthenticated,
  setUser,
} from "../Feature/User/UserSlice";
import { useEffect } from "react";
import { redirect } from "react-router-dom";
const useAuth = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get("/auth/user")
      .then((res) => {
        if (res.data.data.id) {
          dispatch(setUser(res.data.data));
          dispatch(setIsAuthenticated(true));
        } else {
          dispatch(logoutUser());
          redirect("/login");
        }
      })
      .catch((err) => {
        dispatch(logoutUser());
        redirect("/login");
      });
  }, []);

  const isAuthenticated = useSelector(
    (state: RootState) => state.user.value.isAuthenticated
  );
  if (isAuthenticated) {
    return true;
  } else {
    return false;
  }
};

export default useAuth;
