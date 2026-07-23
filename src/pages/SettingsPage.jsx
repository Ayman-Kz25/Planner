import { useEffect, useState } from "react";
import {
  Bell,
  CalendarDays,
  Clock3,
  Flag,
  FolderOpen,
  Save,
} from "lucide-react";
import toast from "react-hot-toast";

import { useSettings } from "../context/SettingsContext";
import Toggle from "../components/Toggle";

const SettingsPage = () => {
  const { settings, updateSettings } = useSettings();

  const [form, setForm] = useState(settings);

  useEffect(() => {
    setForm(settings);
  }, [settings]);

  const setValue = (key, value) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSave = () => {
    updateSettings(form);

    toast.success("Settings saved successfully!");
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
        <h1 className="text-theme text-2xl font-bold md:text-3xl">
          Settings
        </h1>

        <p className="text-muted-theme mt-2 max-w-2xl text-sm leading-6 sm:text-base">
          Customize how Planner behaves and personalize your experience.
        </p>
      </section>

      {/* Preferences */}

      <section className="card-theme border-theme shadow-theme overflow-hidden rounded-3xl border">
        <div className="border-theme flex flex-col gap-4 border-b p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div className="flex items-start gap-4">
            <div className="icon-surface-theme flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl sm:h-12 sm:w-12">
              <Bell size={20} />
            </div>

            <div>
              <h3 className="text-theme text-base font-semibold">
                Notifications
              </h3>

              <p className="text-muted-theme mt-1 text-sm">
                Receive reminders before your tasks are due.
              </p>
            </div>
          </div>

          <Toggle
            checked={form.notifications}
            onChange={() =>
              setValue("notifications", !form.notifications)
            }
          />
        </div>

        <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div className="flex items-start gap-4">
            <div className="icon-surface-theme flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl sm:h-12 sm:w-12">
              <CalendarDays size={20} />
            </div>

            <div>
              <h3 className="text-theme text-base font-semibold">
                Auto Delete Completed Tasks
              </h3>

              <p className="text-muted-theme mt-1 text-sm">
                Automatically remove completed tasks after completion.
              </p>
            </div>
          </div>

          <Toggle
            checked={form.autoDelete}
            onChange={() =>
              setValue("autoDelete", !form.autoDelete)
            }
          />
        </div>
      </section>

      {/* Form */}

      <section className="card-theme border-theme shadow-theme rounded-3xl border p-6">
        <div className="grid gap-6 lg:grid-cols-2">
          <div>
            <label className="text-theme mb-2 flex items-center gap-2 font-medium">
              <FolderOpen size={18} />
              Default Category
            </label>

            <select
              value={form.defaultCategory}
              onChange={(e) =>
                setValue("defaultCategory", e.target.value)
              }
              className={selectClasses}
            >
              <option>Work</option>
              <option>Personal</option>
              <option>Study</option>
            </select>
          </div>

          <div>
            <label className="text-theme mb-2 flex items-center gap-2 font-medium">
              <Flag size={18} />
              Default Priority
            </label>

            <select
              value={form.defaultPriority}
              onChange={(e) =>
                setValue("defaultPriority", e.target.value)
              }
              className={selectClasses}
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </div>

          <div>
            <label className="text-theme mb-2 flex items-center gap-2 font-medium">
              <CalendarDays size={18} />
              Week Starts On
            </label>

            <select
              value={form.weekStarts}
              onChange={(e) =>
                setValue("weekStarts", e.target.value)
              }
              className={selectClasses}
            >
              <option>Monday</option>
              <option>Sunday</option>
            </select>
          </div>

          <div>
            <label className="text-theme mb-2 flex items-center gap-2 font-medium">
              <Clock3 size={18} />
              Time Format
            </label>

            <select
              value={form.timeFormat}
              onChange={(e) =>
                setValue("timeFormat", e.target.value)
              }
              className={selectClasses}
            >
              <option>24 Hours</option>
              <option>12 Hours</option>
            </select>
          </div>

          <div className="lg:col-span-2">
            <label className="text-theme mb-2 block font-medium">
              Date Format
            </label>

            <select
              value={form.dateFormat}
              onChange={(e) =>
                setValue("dateFormat", e.target.value)
              }
              className={selectClasses}
            >
              <option>DD/MM/YYYY</option>
              <option>MM/DD/YYYY</option>
              <option>YYYY-MM-DD</option>
            </select>
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <button
            onClick={handleSave}
            className="primary-theme flex w-full items-center justify-center gap-2 rounded-2xl px-6 py-3 font-medium transition hover:opacity-90 sm:w-auto cursor-pointer"
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