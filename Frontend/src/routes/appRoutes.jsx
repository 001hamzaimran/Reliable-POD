import { Routes, Route, Navigate } from "react-router-dom";
import { AdminLayout } from "../layouts/AdminLayout";
import { UserLayout } from "../layouts/UserLayout";
import AdminDashboard from "../pages/admin/Dashboard";
import AdminSetting from "../pages/admin/Setting";
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

  // Protected Route Component
  const ProtectedRoute = ({ children, requireAdmin = false }) => {
    if (!user) {
      return <Navigate to="/login" />;
    }

    if (requireAdmin && user.role !== "admin") {
      return <Navigate to="/user" />;
    }

    return children;
  };

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Register />} />

      {/* User Routes */}
      <Route
        path="/user"
        element={
          <ProtectedRoute>
            <UserLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<UserDashboard />} />
        <Route path="settings" element={<div>User Settings</div>} />
        <Route path="profile" element={<div>User Profile</div>} />
      </Route>

      {/* Admin Routes - Separate layout routes */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute requireAdmin={true}>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route path="" element={<AdminDashboard />} />
        <Route path="settings" element={<AdminSetting />} />
      </Route>

      {/* Alternative: Admin routes without nesting */}
      <Route
        path="/admin/settings"
        element={
          <ProtectedRoute requireAdmin={true}>
            <AdminLayout>
              <AdminSetting />
            </AdminLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute requireAdmin={true}>
            <AdminLayout>
              <AdminDashboard />
            </AdminLayout>
          </ProtectedRoute>
        }
      />

      {/* Default Route */}
      <Route
        path="/"
        element={
          <Navigate
            to={user ? (user.role === "admin" ? "/admin" : "/user") : "/login"}
          />
        }
      />

      {/* 404 Route */}
      <Route path="*" element={<div>404 - Page Not Found</div>} />
    </Routes>
  );
};

export default AppRoutes;
