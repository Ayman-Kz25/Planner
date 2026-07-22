import {
  Mail,
  User,
  CalendarDays,
  ShieldCheck,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";

const AccountPage = () => {
  const { user } = useAuth();

  const avatar =
    user?.displayName?.charAt(0).toUpperCase() ||
    user?.email?.charAt(0).toUpperCase() ||
    "?";

  return (
    <div className="w-full space-y-6">
      {/* Header */}

      <div className="card-theme border-theme rounded-3xl border p-6 shadow-sm sm:p-8">
        <h1 className="text-theme text-2xl font-bold sm:text-3xl">
          Account
        </h1>

        <p className="text-muted-theme mt-2 text-sm">
          Manage your profile information and account details.
        </p>
      </div>

      {/* Profile */}

      <div className="card-theme border-theme rounded-3xl border p-6 shadow-sm sm:p-8">
        <div className="flex flex-col items-center gap-5 sm:flex-row">
          <div
            className="flex h-24 w-24 items-center justify-center rounded-full text-3xl font-bold"
            style={{
              background: "var(--primary)",
              color: "var(--primary-text)",
            }}
          >
            {avatar}
          </div>

          <div className="text-center sm:text-left">
            <h2 className="text-theme text-xl font-semibold">
              {user?.displayName || "Planner User"}
            </h2>

            <p className="text-muted-theme mt-1 text-sm">
              {user?.email}
            </p>
          </div>
        </div>
      </div>

      {/* Details */}

      <div className="grid gap-5 md:grid-cols-2">
        {/* Email */}

        <div className="card-theme border-theme rounded-3xl border p-5 shadow-sm">
          <div className="text-muted-theme mb-3 flex items-center gap-3">
            <Mail size={18} />

            <span className="text-sm font-medium">
              Email
            </span>
          </div>

          <p className="text-theme break-all font-semibold">
            {user?.email || "No email available"}
          </p>
        </div>

        {/* Status */}

        <div className="card-theme border-theme rounded-3xl border p-5 shadow-sm">
          <div className="text-muted-theme mb-3 flex items-center gap-3">
            <ShieldCheck size={18} />

            <span className="text-sm font-medium">
              Account Status
            </span>
          </div>

          <span
            className="rounded-full px-3 py-1 text-sm font-semibold"
            style={{
              background: "var(--surface)",
              color: "var(--primary)",
            }}
          >
            Active
          </span>
        </div>

        {/* Display Name */}

        <div className="card-theme border-theme rounded-3xl border p-5 shadow-sm">
          <div className="text-muted-theme mb-3 flex items-center gap-3">
            <User size={18} />

            <span className="text-sm font-medium">
              Display Name
            </span>
          </div>

          <p className="text-theme font-semibold">
            {user?.displayName || "Not set"}
          </p>
        </div>

        {/* Member Since */}

        <div className="card-theme border-theme rounded-3xl border p-5 shadow-sm">
          <div className="text-muted-theme mb-3 flex items-center gap-3">
            <CalendarDays size={18} />

            <span className="text-sm font-medium">
              Member Since
            </span>
          </div>

          <p className="text-theme font-semibold">
            {user?.metadata?.creationTime
              ? new Date(
                  user.metadata.creationTime
                ).toLocaleDateString()
              : "Recently"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;