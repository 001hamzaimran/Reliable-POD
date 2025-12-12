import React from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const UserLayout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* User Navigation */}
      <nav className="bg-white shadow-md">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-8">
            <Link to="/user" className="text-xl font-bold text-primary-600">
              MyApp
            </Link>
            <Link
              to="/user/dashboard"
              className="text-gray-700 hover:text-primary-600"
            >
              Dashboard
            </Link>
            <Link
              to="/user/profile"
              className="text-gray-700 hover:text-primary-600"
            >
              Profile
            </Link>
          </div>
          <button
            onClick={handleLogout}
            className="bg-primary-500 text-white px-4 py-2 rounded hover:bg-primary-600"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <Outlet />
      </main>
    </div>
  );
};
