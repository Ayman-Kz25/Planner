import { useState } from "react";

import {
  Bell,
  CalendarDays,
  Clock3,
  Flag,
  FolderOpen,
  Save,
} from "lucide-react";

const SettingsPage = () => {
  const [notifications, setNotifications] = useState(true);
  const [autoDelete, setAutoDelete] = useState(false);

  const [defaultCategory, setDefaultCategory] =
    useState("Work");

  const [defaultPriority, setDefaultPriority] =
    useState("Medium");

  const [weekStarts, setWeekStarts] =
    useState("Monday");

  const [dateFormat, setDateFormat] =
    useState("DD/MM/YYYY");

  const [timeFormat, setTimeFormat] =
    useState("24 Hours");

  const handleSave = () => {
    alert("Settings saved.");
  };

  const selectClasses = `
    card-theme
    text-theme
    border-theme
    focus-ring-theme
    w-full
    rounded-2xl
    border
    px-4
    py-3
    outline-none
    transition
  `;

  return (
    <div className="mx-auto w-full max-w-5xl space-y-6">

      {/* Header */}

      <section className="card-theme border-theme shadow-theme rounded-3xl border p-6 sm:p-8">

        <h1 className="text-theme text-2xl font-bold sm:text-3xl">
          Settings
        </h1>

        <p className="text-muted-theme mt-2 text-sm sm:text-base">
          Customize how Planner behaves.
        </p>

      </section>

      {/* Preferences */}

      <section className="card-theme border-theme shadow-theme rounded-3xl border">

        {/* Notifications */}

        <div className="border-theme flex items-center justify-between border-b p-6">

          <div className="flex items-center gap-4">

            <div className="icon-surface-theme flex h-12 w-12 items-center justify-center rounded-2xl">
              <Bell size={22} />
            </div>

            <div>

              <h3 className="text-theme font-semibold">
                Notifications
              </h3>

              <p className="text-muted-theme text-sm">
                Receive task reminders.
              </p>

            </div>

          </div>

          <button
            onClick={() =>
              setNotifications(!notifications)
            }
            className={`relative h-7 w-12 rounded-full transition ${
              notifications
                ? "primary-theme"
                : "surface-theme"
            }`}
          >
            <div
              className={`absolute top-1 h-5 w-5 rounded-full bg-white transition ${
                notifications
                  ? "left-6"
                  : "left-1"
              }`}
            />
          </button>

        </div>

        {/* Auto Delete */}

        <div className="flex items-center justify-between p-6">

          <div className="flex items-center gap-4">

            <div className="icon-surface-theme flex h-12 w-12 items-center justify-center rounded-2xl">
              <CalendarDays size={22} />
            </div>

            <div>

              <h3 className="text-theme font-semibold">
                Auto Delete Completed Tasks
              </h3>

              <p className="text-muted-theme text-sm">
                Remove completed tasks automatically.
              </p>

            </div>

          </div>

          <button
            onClick={() =>
              setAutoDelete(!autoDelete)
            }
            className={`relative h-7 w-12 rounded-full transition ${
              autoDelete
                ? "primary-theme"
                : "surface-theme"
            }`}
          >
            <div
              className={`absolute top-1 h-5 w-5 rounded-full bg-white transition ${
                autoDelete
                  ? "left-6"
                  : "left-1"
              }`}
            />
          </button>

        </div>

      </section>

      {/* Settings Form */}

      <section className="card-theme border-theme shadow-theme rounded-3xl border p-6">

        <div className="grid gap-6 md:grid-cols-2">

          {/* Category */}

          <div>

            <label className="text-theme mb-2 flex items-center gap-2 font-medium">
              <FolderOpen size={18} />
              Default Category
            </label>

            <select
              value={defaultCategory}
              onChange={(e) =>
                setDefaultCategory(e.target.value)
              }
              className={selectClasses}
            >
              <option>Work</option>
              <option>Personal</option>
              <option>Study</option>
            </select>

          </div>

          {/* Priority */}

          <div>

            <label className="text-theme mb-2 flex items-center gap-2 font-medium">
              <Flag size={18} />
              Default Priority
            </label>

            <select
              value={defaultPriority}
              onChange={(e) =>
                setDefaultPriority(e.target.value)
              }
              className={selectClasses}
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>

          </div>

          {/* Week */}

          <div>

            <label className="text-theme mb-2 flex items-center gap-2 font-medium">
              <CalendarDays size={18} />
              Week Starts On
            </label>

            <select
              value={weekStarts}
              onChange={(e) =>
                setWeekStarts(e.target.value)
              }
              className={selectClasses}
            >
              <option>Monday</option>
              <option>Sunday</option>
            </select>

          </div>

          {/* Time */}

          <div>

            <label className="text-theme mb-2 flex items-center gap-2 font-medium">
              <Clock3 size={18} />
              Time Format
            </label>

            <select
              value={timeFormat}
              onChange={(e) =>
                setTimeFormat(e.target.value)
              }
              className={selectClasses}
            >
              <option>24 Hours</option>
              <option>12 Hours</option>
            </select>

          </div>

          {/* Date */}

          <div className="md:col-span-2">

            <label className="text-theme mb-2 block font-medium">
              Date Format
            </label>

            <select
              value={dateFormat}
              onChange={(e) =>
                setDateFormat(e.target.value)
              }
              className={selectClasses}
            >
              <option>DD/MM/YYYY</option>
              <option>MM/DD/YYYY</option>
              <option>YYYY-MM-DD</option>
            </select>

          </div>

        </div>

        {/* Footer */}

        <div className="mt-8 flex justify-end">

          <button
            onClick={handleSave}
            className="primary-theme rounded-2xl px-6 py-3 font-medium transition hover:opacity-90 flex items-center gap-2"
          >
            <Save size={18} />
            Save Settings
          </button>

        </div>

      </section>

    </div>
  );
};

export default SettingsPage;