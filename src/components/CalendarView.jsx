import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../calendar.css";

import { useTasks } from "../context/TaskContext";

const CalendarView = () => {
  const { tasks } = useTasks();

  const tileContent = ({ date, view }) => {
    if (view !== "month") return null;

    const dayTasks = tasks.filter((task) => {
      if (!task.dueDate) return false;

      const taskDate = task.dueDate?.seconds
        ? new Date(task.dueDate.seconds * 1000)
        : new Date(task.dueDate);

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
              px-1.5
              py-0.5
              text-[10px]
              font-medium
              bg-[var(--primary)]
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

  return (
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
      <Calendar tileContent={tileContent} />
    </section>
  );
};

export default CalendarView;