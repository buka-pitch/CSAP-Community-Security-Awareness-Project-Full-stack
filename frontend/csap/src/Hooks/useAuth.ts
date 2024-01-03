import { useSelector } from "react-redux";
import { RootState } from "../Feature/store";

const useAuth = () => {
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
