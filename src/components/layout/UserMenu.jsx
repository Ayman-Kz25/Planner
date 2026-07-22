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

    return () =>
      window.removeEventListener("click", handleClickOutside);
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
    <div
      ref={menuRef}
      className="relative flex-shrink-0"
    >
      {/* Avatar */}

      <button
        onClick={() => setOpen((prev) => !prev)}
        className="
          flex h-10 w-10
          sm:h-11 sm:w-11
          items-center justify-center
          rounded-full
          bg-slate-900
          text-sm font-semibold
          text-white
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
            fixed
            top-22
            left-3
            right-3
            z-50

            sm:absolute
            sm:top-full
            sm:right-0
            sm:left-auto
            sm:mt-3
            sm:w-80

            rounded-2xl
            border border-slate-200
            bg-white
            p-4
            shadow-2xl
          "
        >
          {/* Profile */}

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

            <div className="min-w-0 flex-1">
              <h3 className="truncate text-base font-semibold">
                {user?.displayName || "User"}
              </h3>

              <p className="truncate text-sm text-slate-500">
                {user?.email}
              </p>
            </div>
          </div>

          <div className="my-4 border-t border-slate-200" />

          <button
            className="
              flex w-full items-center gap-3
              rounded-xl
              px-4 py-3
              text-sm
              hover:bg-slate-100
              transition
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
            "
          >
            <Settings size={18} />
            Settings
          </button>

          <div className="my-4 border-t border-slate-200" />

          <button
            onClick={handleLogout}
            className="
              flex w-full items-center justify-center gap-2
              rounded-xl
              bg-rose-500
              px-4 py-3
              font-medium
              text-white
              transition
              hover:bg-rose-600
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