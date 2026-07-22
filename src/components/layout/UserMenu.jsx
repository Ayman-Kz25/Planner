import { useEffect, useRef, useState } from "react";
import { LogOut, Moon, Settings, User } from "lucide-react";

import { useAuth } from "../../context/AuthContext";

const UserMenu = ({ user }) => {
  const { logout } = useAuth();

  const [open, setOpen] = useState(false);

  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!menuRef.current?.contains(e.target)) {
        setOpen(false);
      }
    };

    window.addEventListener("click", handleClickOutside);

    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  const avatar =
    user?.displayName?.charAt(0).toUpperCase() ||
    user?.email?.charAt(0).toUpperCase() ||
    "?";

  const handleLogout = async () => {
    setOpen(false);
    await logout();
  };

  return (
    <div ref={menuRef} className="relative flex-shrink-0">
      {/* Avatar */}

      <button
        onClick={() => setOpen(!open)}
        className="
          flex h-10 w-10
          sm:h-11 sm:w-11
          items-center justify-center
          rounded-full
          bg-slate-900
          text-sm sm:text-base
          font-semibold
          text-white
          shadow-sm
          transition
          hover:scale-105
          active:scale-95
          cursor-pointer
        "
      >
        {avatar}
      </button>

      {/* Dropdown */}

      {open && (
        <div
          className="
            absolute right-0 mt-3
            w-[92vw] max-w-[300px]
            rounded-2xl
            border border-slate-200
            bg-white
            p-4
            shadow-xl
            animate-in fade-in zoom-in-95
            duration-150
          "
        >
          {/* User */}

          <div className="flex items-center gap-3">
            <div
              className="
                flex h-12 w-12
                items-center justify-center
                rounded-full
                bg-slate-900
                text-lg
                font-semibold
                text-white
              "
            >
              {avatar}
            </div>

            <div className="min-w-0">
              <h3 className="truncate font-semibold text-slate-900">
                {user?.displayName || "User"}
              </h3>

              <p className="truncate text-sm text-slate-500">{user?.email}</p>
            </div>
          </div>

          <div className="my-4 border-t border-slate-200" />

          {/* Menu */}

          <button
            className="
              flex w-full items-center gap-3
              rounded-xl
              px-4 py-3
              text-sm
              hover:bg-slate-100
              transition
              cursor-pointer
            "
          >
            <User size={18} />
            Account
          </button>

          <button
            className="
              flex w-full items-center gap-3
              rounded-xl
              px-4 py-3
              text-sm
              hover:bg-slate-100
              transition
              cursor-pointer
            "
          >
            <Moon size={18} />
            Theme
          </button>

          <button
            className="
              flex w-full items-center gap-3
              rounded-xl
              px-4 py-3
              text-sm
              hover:bg-slate-100
              transition
              cursor-pointer
            "
          >
            <Settings size={18} />
            Settings
          </button>

          <div className="my-3 border-t border-slate-200" />

          <button
            onClick={handleLogout}
            className="
              flex w-full items-center justify-center gap-2
              rounded-xl
              bg-gradient-to-br
                from-rose-300
                to-rose-500
              px-4 py-3
              font-medium
              text-white
              transition-colors
              duration-300
            hover:bg-rose-600
              active:scale-[0.98]
              cursor-pointer
            "
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      )}
    </div>
  );
};
export default UserMenu;
