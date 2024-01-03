import { useLocation, Navigate, useNavigate, Outlet, useNavigation } from "react-router-dom";

import useAuth from "./useAuth";
import { useEffect } from "react";
import { getCookie } from "./ManageCookie";
import { useSelector } from "react-redux";
import { RootState } from "../Feature/store";

export const RequireAuth = () => {
  const isAuthenticated = useAuth();
  const location = useLocation();

  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export const DisabledIfAuthenticated = () => {
  const isAuthenticated = useAuth();
  const location = useLocation();
  const navigation = useNavigation

 useEffect(()=>{
  if (isAuthenticated){
    
  }
 },[])
};

export const AdminOnly = () => {
  const isAuthenicated = useAuth();
  const location = useLocation();
  const user = useSelector((state: RootState) => state.user.value.user);

  if (isAuthenicated && user.Role === "ADMIN") return <Outlet />;
  else if (isAuthenicated && user.Role !== "ADMIN")
    return <Navigate to="/unauthorized" state={{ from: location }} replace />;
  else {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
};
