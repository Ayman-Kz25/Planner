import { useState } from "react";
import { Outlet } from "react-router-dom";

import Header from "./Header";
import Sidebar from "./Sidebar";

const HEADER_HEIGHT = 72;

const AppLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="h-screen overflow-hidden bg-slate-100">

      <Header
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      <div
        className="flex gap-5 p-5"
        style={{ height: `calc(100vh - ${HEADER_HEIGHT}px)` }}
      >
        <Sidebar
          isOpen={isSidebarOpen}
          isClose={() => setIsSidebarOpen(false)}
        />

        <main className="flex-1 overflow-y-auto">
          <div
            className="
              min-h-full
              rounded-[28px]
              border border-slate-200
              bg-white
              shadow-sm
              p-8
            "
          >
            <Outlet />
          </div>
        </main>
      </div>

    </div>
  );
};

export default AppLayout;