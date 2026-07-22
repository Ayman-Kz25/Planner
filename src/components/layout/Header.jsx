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
      <header className="sticky top-0 z-40 bg-gray-50/70 backdrop-blur-xl">
        <div
          className="
            mx-4 mt-4
            flex h-20 items-center justify-between
            rounded-2xl
            border border-white/60
            bg-white/70
            px-6
            shadow-sm
            backdrop-blur-xl
          "
        >
          {/* Left */}

          <div className="flex items-center gap-5">
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

            <div className="flex items-center gap-4">
              <div
                className="
                  flex h-11 w-11
                  items-center justify-center
                  rounded-2xl
                  bg-gradient-to-br
                  from-rose-300
                  to-rose-500
                  text-lg
                  font-bold
                  text-white
                  shadow-sm
                "
              >
                P
              </div>

              <div>
                <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
                  Planner
                </h1>

                <p className="text-sm text-slate-500">
                  Welcome back, {user?.displayName?.split(" ")[0] || "there"}.
                </p>
              </div>
            </div>
          </div>

          {/* Right */}

          <div className="flex items-center gap-4">
            <div
              className="
                hidden
                items-center
                gap-2
                rounded-xl
                bg-slate-100
                px-4 py-2
                lg:flex
              "
            >
              <CalendarDays size={17} className="text-slate-500" />

              <span className="text-sm font-medium text-slate-600">
                {today}
              </span>
            </div>

            <button
              onClick={() => setIsAddModalOpen(true)}
              className="
                flex
                items-center
                gap-2
                rounded-xl
                bg-slate-900
                px-5
                py-3
                text-sm
                font-medium
                text-white
                transition
                hover:scale-[1.02]
                hover:bg-black
                active:scale-95
              "
            >
              <Plus size={18} />

              <span className="hidden sm:block">New Task</span>
            </button>

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
