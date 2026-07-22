import { useState } from "react";
import { Outlet } from "react-router-dom";

import Header from "./Header";
import Sidebar from "./Sidebar";

const HEADER_HEIGHT = 72;

const AppLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div
      className="h-screen overflow-hidden"
      style={{
        background: "var(--bg)",
      }}
    >
      <Header
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      <div
        className="flex gap-3 p-3 sm:gap-5 sm:p-5"
        style={{
          height: `calc(100vh - ${HEADER_HEIGHT}px)`,
        }}
      >
        <Sidebar
          isOpen={isSidebarOpen}
          isClose={() => setIsSidebarOpen(false)}
        />

        <main className="flex-1 overflow-y-auto">
          <div
            className="min-h-full rounded-[28px] border p-4 shadow-sm sm:p-6 lg:p-8"
            style={{
              background: "var(--card)",
              borderColor: "var(--border)",
              color: "var(--text)",
            }}
          >
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AppLayout;