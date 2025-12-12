import React, { useState } from "react";
import { AdminSidebar } from "../components/ui/adminSidebar";
import { Outlet } from "react-router-dom";
import { AdminNavbar } from "../components/ui/adminNavbar";
import { Drawer } from "@mui/material";

export const AdminLayout = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-background text-foreground ">
      {/* Mobile Drawer Sidebar */}
      <Drawer
        variant="temporary"
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", lg: "none" },
          "& .MuiDrawer-paper": { width: 260, boxSizing: "border-box" },
        }}
      >
        <AdminSidebar onNavigate={() => setMobileMenuOpen(false)} />
      </Drawer>

      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <AdminSidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col w-full min-w-0">
        <AdminNavbar onMobileMenuToggle={() => setMobileMenuOpen(true)} />
        <main className="p-4 md:p-6 overflow-x-hidden mt-16">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
