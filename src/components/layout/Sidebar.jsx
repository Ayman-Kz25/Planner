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
          ? "bg-slate-900 text-white shadow-md"
          : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
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
          ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}
        `}
      />

      {/* Sidebar */}

      <aside
        className={`
          fixed left-0 top-0
          z-50

          h-screen
          w-72

          bg-white
          border-r border-slate-200
          shadow-xl

          transition-transform duration-300 ease-in-out

          ${isOpen ? "translate-x-0" : "-translate-x-full"}

          md:static
          md:translate-x-0
          md:h-[calc(100vh-88px)]
          md:top-[88px]
          md:w-72
          md:shadow-none
        `}
      >
        {/* Mobile Header */}

        <div
          className="
            flex items-center justify-between
            border-b border-slate-200
            px-6 py-5
            md:hidden
          "
        >
          <h2 className="text-xl font-bold text-slate-900">Planner</h2>

          <button
            onClick={isClose}
            className="
              rounded-xl
              p-2
              transition
              hover:bg-slate-100
            "
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}

        <nav
          className="
            flex h-full flex-col
            overflow-y-auto
            px-5 py-6
            space-y-8
          "
        >
          {/* Main */}

          <div className="space-y-2">
            <NavLink to="/" onClick={isClose} end className={linkClass}>
              <LayoutDashboard size={18} />
              <span>All Tasks</span>
            </NavLink>

            <NavLink to="/in-progress" onClick={isClose} className={linkClass}>
              <Clock3 size={18} />
              <span>In Progress</span>
            </NavLink>

            <NavLink to="/completed" onClick={isClose} className={linkClass}>
              <CheckCircle2 size={18} />
              <span>Completed</span>
            </NavLink>
          </div>

          {/* Categories */}

          <div>
            <p
              className="
                mb-3
                px-2
                text-xs
                font-semibold
                uppercase
                tracking-[0.18em]
                text-slate-400
              "
            >
              Categories
            </p>

            <div className="space-y-2">
              <NavLink
                to="/category/work"
                onClick={isClose}
                className={linkClass}
              >
                <Briefcase size={18} />
                <span>Work</span>
              </NavLink>

              <NavLink
                to="/category/personal"
                onClick={isClose}
                className={linkClass}
              >
                <User size={18} />
                <span>Personal</span>
              </NavLink>

              <NavLink
                to="/category/study"
                onClick={isClose}
                className={linkClass}
              >
                <GraduationCap size={18} />
                <span>Study</span>
              </NavLink>
            </div>
          </div>

          {/* Planning */}

          <div>
            <p
              className="
                mb-3
                px-2
                text-xs
                font-semibold
                uppercase
                tracking-[0.18em]
                text-slate-400
              "
            >
              Planning
            </p>

            <NavLink to="/calendar" onClick={isClose} className={linkClass}>
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
