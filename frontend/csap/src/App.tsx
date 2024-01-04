import { Route, Routes } from "react-router-dom";

import HomePage from "./Pages/HomePage";
import { Login } from "./Pages/AuthPages/LoginPage/Login";
import { Register } from "./Pages/AuthPages/RegistrationPage/Register";
import ErrorPage from "./Pages/error-page";
import Layout from "./Layout";
import {
  AdminOnly,
  DisabledIfAuthenticated,
  RequireAuth,
} from "./Hooks/RequireAuth";
import Scanner from "./Pages/Scanner";
import AdminLayout from "./Pages/AdminPages/AdminLayout";
import Dashboard from "./Pages/AdminPages/Dashboard";
import UnAuthorized from "./Pages/UnAuthorized";
import Course from "./Pages/AdminPages/Course";
import Challenges from "./Pages/AdminPages/Challenges";
import UserHomePage from "./Pages/HomePage/UserHomePage";
import useAuth from "./Hooks/useAuth";

function App() {
  const isAUthenticated = useAuth();

  let HomePageComponent;
  if (isAUthenticated) {
    HomePageComponent = UserHomePage;
  } else {
    HomePageComponent = HomePage;
  }
  return (
    <Routes>
      <Route path="/" Component={Layout}>
        <Route index Component={HomePageComponent} />

        <Route path="/unauthorized" Component={UnAuthorized} />

        <Route path="/login" Component={Login} />
        <Route path="/register" Component={Register} />

        {/* Protected */}
        <Route Component={RequireAuth}>
          <Route path="/" Component={UserHomePage} />
          <Route path="/scan" Component={Scanner} />
          <Route path="/course" Component={HomePage} />
        </Route>

        {/* Admin Only */}
        {/* <Route Component={AdminOnly}> */}
        <Route path="/admin" Component={AdminLayout}>
          <Route index Component={Dashboard} />
          <Route path="/admin/courses" Component={Course} />
          <Route path="/admin/challenges" Component={Challenges} />
          <Route path="/admin/users" Component={Course} />
          {/* <Route path="/course" Component={} /> */}
        </Route>
        {/* </Route> */}

        {/* Not Found */}
        <Route path="*" element={<ErrorPage />} />
      </Route>
    </Routes>
  );
}
export default App;
