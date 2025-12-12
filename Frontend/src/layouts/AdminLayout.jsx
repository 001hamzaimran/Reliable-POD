import React, { useState } from "react";
import { AdminSidebar } from "../components/ui/adminSidebar";
import { Outlet } from "react-router-dom";
import { AdminNavbar } from "../components/ui/adminNavbar";

export const AdminLayout = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-background text-foreground mt-16">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <AdminSidebar />
      </div>

      {/* Mobile Sidebar */}
      {/* <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <SheetContent side="left" className="p-0 w-64">
          <Sidebar onNavigate={() => setMobileMenuOpen(false)} />
        </SheetContent>
      </Sheet> */}

      <div className="flex-1 flex flex-col w-full min-w-0">
        <AdminNavbar onMobileMenuToggle={() => setMobileMenuOpen(true)} />
        <main className="p-4 md:p-6 overflow-x-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
