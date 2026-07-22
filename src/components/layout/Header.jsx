import { useMemo, useState } from "react";
import { CalendarDays, Menu, Plus } from "lucide-react";

import AddTaskModal from "../task/AddTaskModal";
import UserMenu from "./UserMenu";
import { useAuth } from "../../context/AuthContext";

const Header = ({ onToggleSidebar }) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const { user } = useAuth();

  const today = useMemo(() => {
    return new Date().toLocaleDateString("en-US", {
      weekday: "long",
      month: "short",
      day: "numeric",
    });
  }, []);

  return (
    <>
      <header
        className="sticky top-0 z-40 px-3 pt-3 pb-2 sm:px-4 sm:pt-4 backdrop-blur-xl"
        style={{
          background: "color-mix(in srgb, var(--bg) 75%, transparent)",
        }}
      >
        <div
          className="mx-auto flex h-16 items-center justify-between rounded-2xl border px-4 shadow-sm backdrop-blur-xl sm:h-[72px] sm:px-6"
          style={{
            background: "color-mix(in srgb, var(--card) 88%, transparent)",
            borderColor: "var(--border)",
          }}
        >
          {/* Left */}

          <div className="flex min-w-0 items-center gap-3 sm:gap-4">
            <button
              onClick={onToggleSidebar}
              className="rounded-xl p-2 transition md:hidden"
              style={{
                color: "var(--text)",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "var(--surface)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "transparent")
              }
            >
              <Menu size={22} />
            </button>

            {/* Logo */}

            <div
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl text-base font-bold shadow-sm sm:h-11 sm:w-11"
              style={{
                background: "var(--primary)",
                color: "var(--primary-text)",
              }}
            >
              P
            </div>

            {/* Title */}

            <div className="min-w-0">
              <h1
                className="hidden truncate text-xl font-semibold tracking-tight sm:flex sm:text-2xl"
                style={{
                  color: "var(--text)",
                }}
              >
                Planner
              </h1>

              <p
                className="hidden truncate text-sm sm:block"
                style={{
                  color: "var(--text-muted)",
                }}
              >
                Welcome back, {user?.displayName?.split(" ")[0] || "there"}.
              </p>
            </div>
          </div>

          {/* Right */}

          <div className="flex items-center gap-2 sm:gap-4">
            {/* Date */}

            <div
              className="hidden items-center gap-2 rounded-xl px-4 py-2 lg:flex"
              style={{
                background: "var(--surface)",
              }}
            >
              <CalendarDays
                size={17}
                style={{
                  color: "var(--text-muted)",
                }}
              />

              <span
                className="text-sm font-medium"
                style={{
                  color: "var(--text-muted)",
                }}
              >
                {today}
              </span>
            </div>

            {/* Add Task */}

            <button
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 hover:scale-[1.02] active:scale-95 sm:px-5 sm:py-3"
              style={{
                background: "var(--primary)",
                color: "var(--primary-text)",
              }}
            >
              <Plus size={18} />

              <span className="hidden md:block">
                New Task
              </span>
            </button>

            {/* Avatar */}

            <UserMenu user={user} />
          </div>
        </div>
      </header>

      <AddTaskModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
    </>
  );
};

export default Header;