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
        className="
          sticky top-0 z-40
          bg-slate-100/70
          backdrop-blur-xl
          px-3 pt-3 pb-2
          sm:px-4 sm:pt-4
        "
      >
        <div
          className="
            mx-auto
            flex
            h-16
            items-center
            justify-between
            rounded-2xl
            border border-white/70
            bg-white/80
            px-4
            shadow-sm
            backdrop-blur-xl

            sm:h-[72px]
            sm:px-6
          "
        >
          {/* Left */}

          <div className="flex min-w-0 items-center gap-3 sm:gap-4">
            <button
              onClick={onToggleSidebar}
              className="
                rounded-xl
                p-2
                transition
                hover:bg-slate-100
                md:hidden
              "
            >
              <Menu size={22} />
            </button>

            {/* Logo */}

            <div
              className="
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                rounded-2xl
                bg-gradient-to-br
                from-rose-300
                to-rose-500
                text-base
                font-bold
                text-white
                shadow-sm

                sm:h-11
                sm:w-11
              "
            >
              P
            </div>

            {/* Title */}

            <div className="min-w-0">
              <h1
                className="
                  truncate
                  text-xl
                  font-semibold
                  tracking-tight
                  text-slate-900

                  sm:text-2xl
                  hidden
                  sm:flex
                "
              >
                Planner
              </h1>

              <p className="hidden truncate text-sm text-slate-500 sm:block">
                Welcome back, {user?.displayName?.split(" ")[0] || "there"}.
              </p>
            </div>
          </div>

          {/* Right */}

          <div className="flex items-center gap-2 sm:gap-4">
            {/* Date */}

            <div
              className="
                hidden
                items-center
                gap-2
                rounded-xl
                bg-slate-100
                px-4
                py-2
                lg:flex
              "
            >
              <CalendarDays
                size={17}
                className="text-slate-500"
              />

              <span className="text-sm font-medium text-slate-600">
                {today}
              </span>
            </div>

            {/* Add Task */}

            <button
              onClick={() => setIsAddModalOpen(true)}
              className="
                flex
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-slate-900
                px-3
                py-2.5
                text-sm
                font-medium
                text-white
                transition-all
                duration-200

                hover:scale-[1.02]
                hover:bg-black
                active:scale-95

                sm:px-5
                sm:py-3
              "
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