import {
  Bell,
  CalendarDays,
  Clock3,
  Flag,
  FolderOpen,
  Save,
} from "lucide-react";

import { useSettings } from "../context/SettingsContext";
import Toggle from "../components/Toggle";

const SettingsPage = () => {
  const { settings, updateSetting } = useSettings();

  const handleSave = () => {
    alert("Settings saved successfully.");
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
    text-sm
    sm:text-base
    outline-none
    transition
    appearance-none
    cursor-pointer
  `;

  return (
    <div className="mx-auto w-full max-w-5xl space-y-6">
      {/* Header */}

      <section className="card-theme border-theme shadow-theme rounded-3xl border p-6 sm:p-8">
        <h1 className="text-theme text-2xl font-bold md:text-3xl">Settings</h1>

        <p className="text-muted-theme mt-2 max-w-2xl text-sm leading-6 sm:text-base">
          Customize how Planner behaves and personalize your experience.
        </p>
      </section>

      {/* Preferences */}

      <section className="card-theme border-theme shadow-theme overflow-hidden rounded-3xl border">
        {/* Notifications */}

        <div className="border-theme flex flex-col gap-4 border-b p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div className="flex items-start gap-4">
            <div className="icon-surface-theme flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl sm:h-12 sm:w-12">
              <Bell size={20} />
            </div>

            <div>
              <h3 className="text-theme text-base font-semibold">
                Notifications
              </h3>

              <p className="text-muted-theme mt-1 text-sm leading-5">
                Receive reminders before your tasks are due.
              </p>
            </div>
          </div>

          <Toggle
            checked={settings.notifications}
            onChange={() =>
              updateSetting("notifications", !settings.notifications)
            }
          />
        </div>

        {/* Auto Delete */}

        <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div className="flex items-start gap-4">
            <div className="icon-surface-theme flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl sm:h-12 sm:w-12">
              <CalendarDays size={20} />
            </div>

            <div>
              <h3 className="text-theme text-base font-semibold">
                Auto Delete Completed Tasks
              </h3>

              <p className="text-muted-theme mt-1 text-sm leading-5">
                Automatically remove completed tasks after they're finished.
              </p>
            </div>
          </div>

          <Toggle
            checked={settings.autoDelete}
            onChange={() => updateSetting("autoDelete", !settings.autoDelete)}
          />
        </div>
      </section>

      {/* Form */}

      <section className="card-theme border-theme shadow-theme rounded-3xl border p-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Category */}

          <div>
            <label className="text-theme mb-2 flex items-center gap-2 text-sm font-medium sm:text-base">
              <FolderOpen size={18} />
              Default Category
            </label>

            <select
              value={settings.defaultCategory}
              onChange={(e) => updateSetting("defaultCategory", e.target.value)}
              className={selectClasses}
            >
              <option>Work</option>
              <option>Personal</option>
              <option>Study</option>
            </select>
          </div>

          {/* Priority */}

          <div>
            <label className="text-theme mb-2 flex items-center gap-2 text-sm font-medium sm:text-base">
              <Flag size={18} />
              Default Priority
            </label>

            <select
              value={settings.defaultPriority}
              onChange={(e) => updateSetting("defaultPriority", e.target.value)}
              className={selectClasses}
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </div>

          {/* Week */}

          <div>
            <label className="text-theme mb-2 flex items-center gap-2 text-sm font-medium sm:text-base">
              <CalendarDays size={18} />
              Week Starts On
            </label>

            <select
              value={settings.weekStarts}
              onChange={(e) => updateSetting("weekStarts", e.target.value)}
              className={selectClasses}
            >
              <option>Monday</option>
              <option>Sunday</option>
            </select>
          </div>

          {/* Time */}

          <div>
            <label className="text-theme mb-2 flex items-center gap-2 text-sm font-medium sm:text-base">
              <Clock3 size={18} />
              Time Format
            </label>

            <select
              value={settings.timeFormat}
              onChange={(e) => updateSetting("timeFormat", e.target.value)}
              className={selectClasses}
            >
              <option>24 Hours</option>
              <option>12 Hours</option>
            </select>
          </div>

          {/* Date */}

          <div className="lg:col-span-2">
            <label className="text-theme mb-2 block text-sm font-medium sm:text-base">
              Date Format
            </label>

            <select
              value={settings.dateFormat}
              onChange={(e) => updateSetting("dateFormat", e.target.value)}
              className={selectClasses}
            >
              <option>DD/MM/YYYY</option>
              <option>MM/DD/YYYY</option>
              <option>YYYY-MM-DD</option>
            </select>
          </div>
        </div>

        <div className="mt-8 flex">
          <button
            onClick={handleSave}
            className="
              primary-theme
              flex
              w-full
              items-center
              justify-center
              gap-2
              rounded-2xl
              px-6
              py-3
              font-medium
              transition
              hover:opacity-90
              sm:ml-auto
              sm:w-auto
            "
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
