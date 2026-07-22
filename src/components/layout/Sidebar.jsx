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
      group flex items-center gap-3
      rounded-xl
      px-3 py-2.5
      text-sm font-medium
      transition-all duration-200

      ${
        isActive
          ? "bg-slate-900 text-white shadow-sm"
          : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
      }
    `;

  return (
    <>
      {/* Mobile Overlay */}

      <div
        onClick={isClose}
        className={`
          fixed inset-0 z-40 bg-black/20 backdrop-blur-sm
          transition-opacity duration-300
          md:hidden
          ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}
        `}
      />

      {/* Sidebar */}

      <aside
        className={`
          fixed md:static
          left-0 top-[72px]
          z-50

          h-[calc(100vh-72px)]
          w-72

          bg-white
          border-r border-slate-200

          transition-transform duration-300

          ${
            isOpen
              ? "translate-x-0"
              : "-translate-x-full md:translate-x-0"
          }
        `}
      >
        {/* Mobile Close */}

        <div className="flex justify-end p-4 md:hidden">
          <button
            onClick={isClose}
            className="
              rounded-lg
              p-2
              hover:bg-slate-100
            "
          >
            <X size={18} />
          </button>
        </div>

        <nav className="px-4 py-6 space-y-8">

          {/* Main */}

          <div className="space-y-2">

            <NavLink to="/" end className={linkClass}>
              <LayoutDashboard size={18} />
              <span>All Tasks</span>
            </NavLink>

            <NavLink
              to="/in-progress"
              className={linkClass}
            >
              <Clock3 size={18} />
              <span>In Progress</span>
            </NavLink>

            <NavLink
              to="/completed"
              className={linkClass}
            >
              <CheckCircle2 size={18} />
              <span>Completed</span>
            </NavLink>

          </div>

          {/* Categories */}

          <div>

            <p className="
                px-3
                mb-3
                text-xs
                uppercase
                tracking-[0.18em]
                text-slate-400
                font-semibold
              ">
              Categories
            </p>

            <div className="space-y-2">

              <NavLink
                to="/category/work"
                className={linkClass}
              >
                <Briefcase size={18} />
                Work
              </NavLink>

              <NavLink
                to="/category/personal"
                className={linkClass}
              >
                <User size={18} />
                Personal
              </NavLink>

              <NavLink
                to="/category/study"
                className={linkClass}
              >
                <GraduationCap size={18} />
                Study
              </NavLink>

            </div>

          </div>

          {/* Calendar */}

          <div>

            <p className="
                px-3
                mb-3
                text-xs
                uppercase
                tracking-[0.18em]
                text-slate-400
                font-semibold
              ">
              Planning
            </p>

            <NavLink
              to="/calendar"
              className={linkClass}
            >
              <CalendarDays size={18} />
              Calendar
            </NavLink>

          </div>

        </nav>
      </aside>
    </>
  );
};

export default Sidebar;