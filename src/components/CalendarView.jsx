import { useMemo, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../calendar.css";

import { format, isSameDay } from "date-fns";
import { CalendarDays, FolderOpen, Flag, CheckCircle2 } from "lucide-react";

import { useTasks } from "../context/TaskContext";
import { useSettings } from "../context/SettingsContext";

const CalendarView = () => {
  const { tasks } = useTasks();
  const { settings } = useSettings();

  const [selectedDate, setSelectedDate] = useState(new Date());

  const tileContent = ({ date, view }) => {
    if (view !== "month") return null;

    const dayTasks = tasks.filter((task) => {
      if (!task.dueDate) return false;

      const taskDate = getTaskDate(task);

      return (
        taskDate.getFullYear() === date.getFullYear() &&
        taskDate.getMonth() === date.getMonth() &&
        taskDate.getDate() === date.getDate()
      );
    });

    if (!dayTasks.length) return null;

    return (
      <div className="mt-1 space-y-1">
        {dayTasks.slice(0, 2).map((task) => (
          <div
            key={task.id}
            title={task.title}
            className="
              truncate
              rounded-md
              bg-[var(--primary)]
              px-1.5
              py-0.5
              text-[10px]
              font-medium
              text-[var(--primary-text)]
            "
          >
            {task.title}
          </div>
        ))}

        {dayTasks.length > 2 && (
          <p className="text-[10px] text-muted-theme">
            +{dayTasks.length - 2} more
          </p>
        )}
      </div>
    );
  };

  const selectedTasks = useMemo(() => {
    return tasks.filter((task) => {
      if (!task.dueDate) return false;

      const taskDate = getTaskDate(task);

      return isSameDay(taskDate, selectedDate);
    });
  }, [tasks, selectedDate]);

  const formattedDate = (() => {
    switch (settings.dateFormat) {
      case "MM/DD/YYYY":
        return format(selectedDate, "MM/dd/yyyy");

      case "YYYY/MM/DD":
        return format(selectedDate, "yyyy/MM/dd");

      default:
        return format(selectedDate, "dd/MM/yyyy");
    }
  })();

  return (
    <div className="space-y-6">
      {/* Calendar */}

      <section
        className="
          card-theme
          border-theme
          shadow-theme
          rounded-3xl
          border
          p-6
        "
      >
        <Calendar
          calendarType={
            settings.weekStarts === "Monday" ? "iso8601" : "gregory"
          }
          value={selectedDate}
          onChange={setSelectedDate}
          tileContent={tileContent}
        />
      </section>

      {/* Mobile Selected Date Tasks */}

      <section
        className="
          card-theme
          border-theme
          shadow-theme
          rounded-3xl
          border
          p-5
          md:hidden
        "
      >
        <div className="flex items-center gap-3">
          <div className="icon-surface-theme rounded-xl p-3">
            <CalendarDays size={20} />
          </div>

          <div>
            <h2 className="text-theme text-lg font-semibold">
              {formattedDate}
            </h2>

            <p className="text-muted-theme text-sm">
              {selectedTasks.length}{" "}
              {selectedTasks.length === 1 ? "task" : "tasks"}
            </p>
          </div>
        </div>

        {selectedTasks.length ? (
          <div className="mt-5 space-y-4">
            {selectedTasks.map((task) => (
              <div
                key={task.id}
                className="
                  surface-theme
                  rounded-2xl
                  p-4
                "
              >
                <h3 className="text-theme font-semibold">{task.title}</h3>

                {task.description && (
                  <p className="text-muted-theme mt-2 text-sm">
                    {task.description}
                  </p>
                )}

                <div className="mt-4 flex flex-wrap gap-3 text-xs">
                  <div className="flex items-center gap-1 text-theme">
                    <FolderOpen size={14} />
                    {task.category}
                  </div>

                  <div className="flex items-center gap-1 text-theme">
                    <Flag size={14} />
                    {task.priority}
                  </div>

                  <div className="flex items-center gap-1 text-theme">
                    <CheckCircle2 size={14} />
                    {task.status}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div
            className="
              surface-theme
              mt-5
              rounded-2xl
              border
              border-dashed
              border-theme
              p-8
              text-center
            "
          >
            <CalendarDays size={36} className="mx-auto mb-3 text-muted-theme" />

            <h3 className="text-theme font-semibold">No Tasks Assigned</h3>

            <p className="text-muted-theme mt-2 text-sm">
              You don't have any tasks scheduled for this day.
            </p>
          </div>
        )}
      </section>
    </div>
  );
};

export default CalendarView;
