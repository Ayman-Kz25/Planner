import { CalendarDays } from "lucide-react";

import CalendarView from "../components/CalendarView";

const CalendarPage = () => {
  return (
    <div className="space-y-8">
      {/* Hero */}

      <section className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Calendar
          </h1>

          <p className="mt-2 text-slate-500">
            View your tasks on a monthly calendar and stay ahead of upcoming
            deadlines.
          </p>
        </div>

        <div
          className="
            flex items-center gap-3
            rounded-2xl
            border border-slate-200
            bg-white
            px-5 py-4
            shadow-sm
          "
        >
          <div className="rounded-xl bg-indigo-100 p-3 text-indigo-600">
            <CalendarDays size={22} />
          </div>

          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500">
              Planner
            </p>

            <h3 className="font-semibold text-slate-900">
              Monthly Calendar
            </h3>
          </div>
        </div>
      </section>

      <CalendarView />
    </div>
  );
};

export default CalendarPage;