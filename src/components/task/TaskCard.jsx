import {
  CalendarDays,
  CheckCircle2,
  Circle,
  Clock3,
  Pencil,
  Trash2,
  Flag,
  FolderOpen,
} from "lucide-react";

import { format, isPast, isToday, isValid } from "date-fns";

const statusStyles = {
  todo: {
    label: "Todo",
    className: "bg-slate-100 text-slate-700",
    icon: Circle,
  },
  "in-progress": {
    label: "In Progress",
    className: "bg-amber-100 text-amber-700",
    icon: Clock3,
  },
  completed: {
    label: "Completed",
    className: "bg-emerald-100 text-emerald-700",
    icon: CheckCircle2,
  },
};

const priorityStyles = {
  low: "bg-emerald-100 text-emerald-700",
  medium: "bg-yellow-100 text-yellow-700",
  high: "bg-rose-100 text-rose-700",
};

const TaskCard = ({
  task,
  onEdit,
  onDelete,
  onView,
}) => {
  let dueDate = null;

  if (task.dueDate) {
    dueDate = task.dueDate.seconds
      ? new Date(task.dueDate.seconds * 1000)
      : new Date(task.dueDate);
  }

  if (dueDate && !isValid(dueDate)) {
    dueDate = null;
  }

  let dueLabel = "";
  let dueColor = "text-slate-500";

  if (dueDate) {
    if (isPast(dueDate) && task.status !== "completed") {
      dueLabel = "Overdue";
      dueColor = "text-rose-600";
    } else if (isToday(dueDate)) {
      dueLabel = "Due Today";
      dueColor = "text-amber-600";
    } else {
      dueLabel = format(dueDate, "MMM dd, yyyy");
    }
  }

  const status =
    statusStyles[task.status] ||
    statusStyles.todo;

  const StatusIcon = status.icon;

  return (
    <div
      onClick={() => onView?.(task)}
      className="
        group
        cursor-pointer
        rounded-2xl sm:rounded-3xl
        border border-slate-200
        bg-white
        p-4 sm:p-5 lg:p-6
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-lg
      "
    >
      {/* Header */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0 flex-1">
          <h3
            className="
              break-words
              text-lg
              font-semibold
              text-slate-900
              sm:text-xl
            "
          >
            {task.title}
          </h3>

          {task.description && (
            <p
              className="
                mt-2
                line-clamp-2
                text-sm
                leading-6
                text-slate-500
              "
            >
              {task.description}
            </p>
          )}
        </div>

        <span
          className={`
            inline-flex
            w-fit
            items-center
            gap-1
            rounded-full
            px-3
            py-1
            text-xs
            font-semibold
            ${status.className}
          `}
        >
          <StatusIcon size={14} />
          {status.label}
        </span>
      </div>

      {/* Category */}

      <div className="mt-5 flex items-center gap-2 text-sm text-slate-600">
        <FolderOpen size={16} />

        <span className="truncate">{task.category}</span>
      </div>

      {/* Footer */}

      <div
        className="
          mt-6
          flex
          flex-col
          gap-5
          lg:flex-row
          lg:items-center
          lg:justify-between
        "
      >
        {/* Left */}

        <div className="space-y-3">
          {dueDate && (
            <div
              className={`flex items-center gap-2 text-sm ${dueColor}`}
            >
              <CalendarDays
                size={16}
                className="shrink-0"
              />

              <span>{dueLabel}</span>
            </div>
          )}

          <span
            className={`
              inline-flex
              w-fit
              items-center
              gap-2
              rounded-full
              px-3
              py-1
              text-xs
              font-semibold
              ${
                priorityStyles[
                  task.priority || "medium"
                ]
              }
            `}
          >
            <Flag size={13} />

            {(task.priority || "medium")
              .charAt(0)
              .toUpperCase() +
              (task.priority || "medium").slice(1)}
          </span>
        </div>

        {/* Actions */}

        <div
          onClick={(e) => e.stopPropagation()}
          className="
            flex
            flex-col
            gap-2
            sm:flex-row
            sm:justify-end
          "
        >
          <button
            onClick={() => onEdit?.(task)}
            className="
              flex
              w-full
              items-center
              justify-center
              gap-2
              rounded-xl
              border
              border-slate-200
              px-4
              py-2.5
              text-sm
              font-medium
              transition
              hover:bg-slate-100
              sm:w-auto
            "
          >
            <Pencil size={16} />
            Edit
          </button>

          <button
            onClick={() => onDelete?.(task)}
            className="
              flex
              w-full
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-rose-500
              px-4
              py-2.5
              text-sm
              font-medium
              text-white
              transition
              hover:bg-rose-600
              sm:w-auto
            "
          >
            <Trash2 size={16} />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;