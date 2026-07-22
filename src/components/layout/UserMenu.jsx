import { useEffect, useRef, useState } from "react";
import { LogOut, Moon, Settings, User } from "lucide-react";
import { Link } from "react-router-dom";

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
          flex
          h-10
          w-10
          items-center
          justify-center
          rounded-full
          text-sm
          font-semibold
          transition
          hover:scale-105
          active:scale-95
          sm:h-11
          sm:w-11
        "
        style={{
          backgroundColor: "var(--primary)",
          color: "var(--primary-text)",
        }}
      >
        {avatar}
      </button>

      {/* Dropdown */}

      {open && (
        <div
          className="
            fixed
            left-3
            right-3
            top-22
            z-50

            rounded-2xl
            border
            p-4
            shadow-2xl

            sm:absolute
            sm:left-auto
            sm:right-0
            sm:top-full
            sm:mt-3
            sm:w-80
          "
          style={{
            backgroundColor: "var(--card)",
            borderColor: "var(--border)",
          }}
        >
          {/* Profile */}

          <div className="flex items-center gap-3">
            <div
              className="
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-full
                text-lg
                font-semibold
              "
              style={{
                backgroundColor: "var(--primary)",
                color: "var(--primary-text)",
              }}
            >
              {avatar}
            </div>

            <div className="min-w-0 flex-1">
              <h3
                className="truncate text-base font-semibold"
                style={{ color: "var(--text)" }}
              >
                {user?.displayName || "User"}
              </h3>

              <p
                className="truncate text-sm"
                style={{ color: "var(--text-muted)" }}
              >
                {user?.email}
              </p>
            </div>
          </div>

          <div
            className="my-4 border-t"
            style={{ borderColor: "var(--border)" }}
          />

          <Link
            to="/account"
            onClick={() => setOpen(false)}
            className="
              flex
              w-full
              items-center
              gap-3
              rounded-xl
              px-4
              py-3
              text-sm
              transition
            "
            style={{
              color: "var(--text)",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor =
                "var(--surface-hover)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "transparent")
            }
          >
            <User size={18} />
            Account
          </Link>

          <Link
            to="/theme"
            onClick={() => setOpen(false)}
            className="
              flex
              w-full
              items-center
              gap-3
              rounded-xl
              px-4
              py-3
              text-sm
              transition
            "
            style={{
              color: "var(--text)",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor =
                "var(--surface-hover)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "transparent")
            }
          >
            <Moon size={18} />
            Theme
          </Link>

          <Link
            to="/settings"
            onClick={() => setOpen(false)}
            className="
              flex
              w-full
              items-center
              gap-3
              rounded-xl
              px-4
              py-3
              text-sm
              transition
            "
            style={{
              color: "var(--text)",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor =
                "var(--surface-hover)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "transparent")
            }
          >
            <Settings size={18} />
            Settings
          </Link>

          <div
            className="my-4 border-t"
            style={{ borderColor: "var(--border)" }}
          />

          <button
            onClick={handleLogout}
            className="
              flex
              w-full
              items-center
              justify-center
              gap-2
              rounded-xl
              px-4
              py-3
              font-medium
              transition
              hover:opacity-90
            "
            style={{
              backgroundColor: "var(--primary)",
              color: "var(--primary-text)",
            }}
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