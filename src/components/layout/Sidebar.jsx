import {
  LayoutDashboard,
  Clock3,
  CheckCircle2,
  Briefcase,
  User,
  GraduationCap,
  CalendarDays,
  X,
} from "lucide-react";

import { NavLink } from "react-router-dom";

const Sidebar = ({ isOpen, isClose }) => {
  const linkClass = ({ isActive }) =>
    `
      flex items-center gap-3
      rounded-2xl
      px-4 py-3
      text-sm font-medium
      transition-all duration-200

      ${
        isActive
          ? ""
          : "hover:opacity-90"
      }
    `;

  return (
    <>
      {/* Mobile Overlay */}

      <div
        onClick={isClose}
        className={`
          fixed inset-0 z-40
          bg-black/40
          backdrop-blur-sm
          transition-all duration-300
          md:hidden
          ${
            isOpen
              ? "opacity-100 visible"
              : "opacity-0 invisible"
          }
        `}
      />

      {/* Sidebar */}

      <aside
        className={`
          fixed
          left-0
          top-0
          z-50

          h-screen
          w-72

          border-r
          transition-transform
          duration-300
          ease-in-out

          ${
            isOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }

          md:static
          md:translate-x-0
          md:h-[calc(100vh-88px)]
          md:w-72
        `}
        style={{
          background: "var(--card)",
          borderColor: "var(--border)",
          boxShadow: "0 12px 30px rgba(0,0,0,.08)",
        }}
      >
        {/* Mobile Header */}

        <div
          className="flex items-center justify-between border-b px-6 py-5 md:hidden"
          style={{
            borderColor: "var(--border)",
          }}
        >
          <h2
            className="text-xl font-bold"
            style={{
              color: "var(--text)",
            }}
          >
            Planner
          </h2>

          <button
            onClick={isClose}
            className="rounded-xl p-2 transition"
            style={{
              color: "var(--text)",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background =
                "var(--surface-hover)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background =
                "transparent")
            }
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}

        <nav
          className="
            flex
            h-full
            flex-col
            overflow-y-auto
            space-y-8
            px-5
            py-6
          "
        >
          {/* Main */}

          <div className="space-y-2">
            <NavLink
              to="/"
              end
              onClick={isClose}
              className={linkClass}
              style={({ isActive }) => ({
                background: isActive
                  ? "var(--primary)"
                  : "transparent",
                color: isActive
                  ? "var(--primary-text)"
                  : "var(--text)",
              })}
            >
              <LayoutDashboard size={18} />
              <span>All Tasks</span>
            </NavLink>

            <NavLink
              to="/in-progress"
              onClick={isClose}
              className={linkClass}
              style={({ isActive }) => ({
                background: isActive
                  ? "var(--primary)"
                  : "transparent",
                color: isActive
                  ? "var(--primary-text)"
                  : "var(--text)",
              })}
            >
              <Clock3 size={18} />
              <span>In Progress</span>
            </NavLink>

            <NavLink
              to="/completed"
              onClick={isClose}
              className={linkClass}
              style={({ isActive }) => ({
                background: isActive
                  ? "var(--primary)"
                  : "transparent",
                color: isActive
                  ? "var(--primary-text)"
                  : "var(--text)",
              })}
            >
              <CheckCircle2 size={18} />
              <span>Completed</span>
            </NavLink>
          </div>

          {/* Categories */}

          <div>
            <p
              className="mb-3 px-2 text-xs font-semibold uppercase tracking-[0.18em]"
              style={{
                color: "var(--text-muted)",
              }}
            >
              Categories
            </p>

            <div className="space-y-2">
              <NavLink
                to="/category/work"
                onClick={isClose}
                className={linkClass}
                style={({ isActive }) => ({
                  background: isActive
                    ? "var(--primary)"
                    : "transparent",
                  color: isActive
                    ? "var(--primary-text)"
                    : "var(--text)",
                })}
              >
                <Briefcase size={18} />
                <span>Work</span>
              </NavLink>

              <NavLink
                to="/category/personal"
                onClick={isClose}
                className={linkClass}
                style={({ isActive }) => ({
                  background: isActive
                    ? "var(--primary)"
                    : "transparent",
                  color: isActive
                    ? "var(--primary-text)"
                    : "var(--text)",
                })}
              >
                <User size={18} />
                <span>Personal</span>
              </NavLink>

              <NavLink
                to="/category/study"
                onClick={isClose}
                className={linkClass}
                style={({ isActive }) => ({
                  background: isActive
                    ? "var(--primary)"
                    : "transparent",
                  color: isActive
                    ? "var(--primary-text)"
                    : "var(--text)",
                })}
              >
                <GraduationCap size={18} />
                <span>Study</span>
              </NavLink>
            </div>
          </div>

          {/* Planning */}

          <div>
            <p
              className="mb-3 px-2 text-xs font-semibold uppercase tracking-[0.18em]"
              style={{
                color: "var(--text-muted)",
              }}
            >
              Planning
            </p>

            <NavLink
              to="/calendar"
              onClick={isClose}
              className={linkClass}
              style={({ isActive }) => ({
                background: isActive
                  ? "var(--primary)"
                  : "transparent",
                color: isActive
                  ? "var(--primary-text)"
                  : "var(--text)",
              })}
            >
              <CalendarDays size={18} />
              <span>Calendar</span>
            </NavLink>
          </div>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;