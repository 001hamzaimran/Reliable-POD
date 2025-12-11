import React from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const AdminLayout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Admin Sidebar */}
      <div className="flex">
        <aside className="w-64 bg-primary-700 text-white min-h-screen">
          <div className="p-4">
            <h2 className="text-2xl font-bold">Admin Panel</h2>
          </div>
          <nav className="mt-8">
            <ul>
              <li className="mb-2">
                <Link to="/admin" className="block p-4 hover:bg-primary-600">
                  Dashboard
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="/admin/users"
                  className="block p-4 hover:bg-primary-600"
                >
                  Manage Users
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="/admin/settings"
                  className="block p-4 hover:bg-primary-600"
                >
                  Settings
                </Link>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800">
              Admin Dashboard
            </h1>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </div>
          <Outlet />
        </main>
      </div>
    </div>
  );
};
