import { Routes, Route, Navigate } from "react-router-dom";
import { AdminLayout } from "../layouts/AdminLayout";
import { UserLayout } from "../layouts/UserLayout";
import AdminDashboard from "../pages/admin/Dashboard";
import UserDashboard from "../pages/user/Dashboard";
import Login from "../pages/Login";
import Register from "../pages/Register";
import { useAuth } from "../context/AuthContext";

const AppRoutes = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Register />} />

      {/* User Routes */}
      <Route
        path="/user/*"
        element={user ? <UserLayout /> : <Navigate to="/login" />}
      >
        <Route index element={<UserDashboard />} />
        {/* Add more user routes here */}
      </Route>

      {/* Admin Routes */}
      <Route
        path="/admin/*"
        element={
          user && user.role === "admin" ? (
            <AdminLayout />
          ) : (
            <Navigate to="/login" />
          )
        }
      >
        <Route index element={<AdminDashboard />} />
        {/* Add more admin routes here */}
      </Route>

      {/* Default Route */}
      <Route path="*" element={<Navigate to={user ? "/user" : "/login"} />} />
    </Routes>
  );
};

export default AppRoutes;
