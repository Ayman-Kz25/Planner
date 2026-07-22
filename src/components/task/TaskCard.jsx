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
    className: "surface-theme text-muted-theme",
    icon: Circle,
  },
  "in-progress": {
    label: "In Progress",
    className: "bg-[var(--warning-bg)] text-[var(--warning)]",
    icon: Clock3,
  },
  completed: {
    label: "Completed",
    className: "bg-[var(--success-bg)] text-[var(--success)]",
    icon: CheckCircle2,
  },
};

const priorityStyles = {
  low: "bg-[var(--success-bg)] text-[var(--success)]",
  medium: "bg-[var(--warning-bg)] text-[var(--warning)]",
  high: "bg-[var(--danger-bg)] text-[var(--danger)]",
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
  let dueColor = "text-muted-theme";

  if (dueDate) {
    if (isPast(dueDate) && task.status !== "completed") {
      dueLabel = "Overdue";
      dueColor = "text-[var(--danger)]";
    } else if (isToday(dueDate)) {
      dueLabel = "Due Today";
      dueColor = "text-[var(--warning)]";
    } else {
      dueLabel = format(dueDate, "MMM dd, yyyy");
    }
  }

  const status =
    statusStyles[task.status] || statusStyles.todo;

  const StatusIcon = status.icon;

  return (
    <div
      onClick={() => onView?.(task)}
      className="
        group
        cursor-pointer
        rounded-2xl
        sm:rounded-3xl
        border-theme
        card-theme
        shadow-theme
        border
        p-4
        sm:p-5
        lg:p-6
        transition-all
        duration-300
        hover:-translate-y-1
      "
    >
      {/* Header */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0 flex-1">
          <h3
            className="
              text-theme
              break-words
              text-lg
              font-semibold
              sm:text-xl
            "
          >
            {task.title}
          </h3>

          {task.description && (
            <p
              className="
                text-muted-theme
                mt-2
                line-clamp-2
                text-sm
                leading-6
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

      <div className="text-muted-theme mt-5 flex items-center gap-2 text-sm">
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
              surface-theme
              surface-hover-theme
              text-theme
              border-theme
              flex
              w-full
              items-center
              justify-center
              gap-2
              rounded-xl
              border
              px-4
              py-2.5
              text-sm
              font-medium
              transition
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
              bg-[var(--danger)]
              px-4
              py-2.5
              text-sm
              font-medium
              text-white
              transition
              hover:opacity-90
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