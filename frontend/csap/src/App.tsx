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

function App() {
  return (
    <Routes>
      <Route path="/" Component={Layout}>
        <Route index Component={HomePage} />

        <Route path="/unauthorized" Component={UnAuthorized} />

        <Route path="/login" Component={Login} />
        <Route path="/register" Component={Register} />

        {/* Protected */}
        <Route Component={RequireAuth}>
          <Route path="/scan" Component={Scanner} />
          <Route path="/course" Component={HomePage} />
        </Route>

        {/* Admin Only */}
        <Route Component={AdminOnly}>
          <Route path="/admin" Component={AdminLayout}>
            <Route index Component={Dashboard} />
          </Route>
        </Route>

        {/* Not Found */}
        <Route path="*" element={<ErrorPage />} />
      </Route>
    </Routes>
  );
}
export default App;
