import { useEffect, useRef, useState } from "react";
import { useAuth } from "../../context/AuthContext";

const UserMenu = ({ user }) => {
  const { logout } = useAuth();

  const [open, setOpen] = useState(false);

  const menuRef = useRef(null);

  useEffect(() => {
    const close = (e) => {
      if (!menuRef.current?.contains(e.target)) {
        setOpen(false);
      }
    };

    window.addEventListener("click", close);

    return () => window.removeEventListener("click", close);
  }, []);

  const avatar =
    user?.displayName?.charAt(0).toUpperCase() ||
    user?.email?.charAt(0).toUpperCase() ||
    "?";

  return (
    <div
      ref={menuRef}
      className="relative"
    >
      <button
        onClick={() => setOpen(!open)}
        className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-900 text-white font-semibold cursor-pointer"
      >
        {avatar}
      </button>

      {open && (
        <div className="absolute right-0 mt-3 w-72 rounded-2xl border bg-white shadow-xl p-4">

          <div>
            <h3 className="font-semibold">
              {user?.displayName || "User"}
            </h3>

            <p className="text-sm text-slate-500">
              {user?.email}
            </p>
          </div>

          <div className="my-4 border-t" />

          <button
            className="w-full rounded-xl px-4 py-2 text-left hover:bg-slate-100"
          >
            Account
          </button>

          <button
            className="w-full rounded-xl px-4 py-2 text-left hover:bg-slate-100"
          >
            Theme
          </button>

          <button
            onClick={logout}
            className="mt-2 w-full rounded-xl bg-rose-400 px-4 py-2 text-white hover:bg-rose-500"
          >
            Logout
          </button>

        </div>
      )}
    </div>
  );
};

export default UserMenu;