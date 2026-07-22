import { CalendarDays } from "lucide-react";

import CalendarView from "../components/CalendarView";

const CalendarPage = () => {
  return (
    <div className="space-y-8">
      {/* Hero */}

      <section className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1
            className="text-3xl font-bold"
            style={{
              color: "var(--text)",
            }}
          >
            Calendar
          </h1>

          <p
            className="mt-2"
            style={{
              color: "var(--text-muted)",
            }}
          >
            View your tasks on a monthly calendar and stay ahead of upcoming
            deadlines.
          </p>
        </div>

        {/* Info Card */}

        <div
          className="flex items-center gap-3 rounded-2xl border px-5 py-4 shadow-sm"
          style={{
            background: "var(--card)",
            borderColor: "var(--border)",
          }}
        >
          <div
            className="rounded-xl p-3"
            style={{
              background: "var(--surface)",
              color: "var(--primary)",
            }}
          >
            <CalendarDays size={22} />
          </div>

          <div>
            <p
              className="text-xs uppercase tracking-wide"
              style={{
                color: "var(--text-muted)",
              }}
            >
              Planner
            </p>

            <h3
              className="font-semibold"
              style={{
                color: "var(--text)",
              }}
            >
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