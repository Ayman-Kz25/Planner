import { useState } from "react";
import { Menu, Plus } from "lucide-react";

import AddTaskModal from "../task/AddTaskModal";
import UserMenu from "./UserMenu";
import { useAuth } from "../../context/AuthContext";

const Header = ({ onToggleSidebar }) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const { user } = useAuth();

  return (
    <>
      <header
        className="
          sticky top-0 z-40
          flex items-center justify-between
          h-18
          px-6
          bg-white/80
          backdrop-blur-xl
          border-b border-slate-200
        "
      >
        {/* Left */}

        <div className="flex items-center gap-4">

          <button
            onClick={onToggleSidebar}
            className="
              md:hidden
              p-2
              rounded-xl
              hover:bg-slate-100
              transition
              cursor-pointer
            "
          >
            <Menu size={22} />
          </button>

          <div>

            <h1
              className="
                text-2xl
                font-semibold
                tracking-tight
                text-slate-900
              "
            >
              Planner
            </h1>

            <p className="text-xs text-slate-500">
              Organize today.
            </p>

          </div>

        </div>

        {/* Right */}

        <div className="flex items-center gap-3">

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="
              flex items-center gap-2
              rounded-xl
              bg-slate-900
              px-4 py-2.5
              text-sm
              font-medium
              text-white
              hover:bg-black
              transition
              cursor-pointer
            "
          >
            <Plus size={18} />
            New Task
          </button>

          <UserMenu user={user} />

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