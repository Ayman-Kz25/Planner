import { format } from "date-fns";
import {
  CalendarDays,
  FolderKanban,
  Flag,
  CheckCircle2,
  FileText,
  X,
} from "lucide-react";

const statusStyles = {
  todo: "surface-theme text-muted-theme",
  "in-progress":
    "bg-[var(--warning-bg)] text-[var(--warning)]",
  completed:
    "bg-[var(--success-bg)] text-[var(--success)]",
};

const priorityStyles = {
  low: "bg-[var(--success-bg)] text-[var(--success)]",
  medium: "bg-[var(--warning-bg)] text-[var(--warning)]",
  high: "bg-[var(--danger-bg)] text-[var(--danger)]",
};

const TaskDetailModal = ({ task, onClose }) => {
  if (!task) return null;

  const dueDate = task.dueDate?.seconds
    ? new Date(task.dueDate.seconds * 1000)
    : task.dueDate
    ? new Date(task.dueDate)
    : null;

  return (
    <div
      className="
        fixed inset-0 z-[9999]
        flex items-center justify-center
        bg-black/50
        backdrop-blur-sm
        p-3 sm:p-5
      "
    >
      <div
        className="
          card-theme
          shadow-theme
          border-theme
          flex
          max-h-[92vh]
          w-full
          max-w-2xl
          flex-col
          overflow-hidden
          rounded-2xl
          sm:rounded-3xl
          border
        "
      >
        {/* Header */}

        <div
          className="
            border-theme
            flex items-start justify-between
            gap-4
            border-b
            px-5
            py-5
            sm:px-8
          "
        >
          <div className="min-w-0">
            <h2
              className="
                text-theme
                break-words
                text-xl
                font-bold
                sm:text-2xl
              "
            >
              {task.title}
            </h2>

            <p className="text-muted-theme mt-1 text-sm">
              Task Details
            </p>
          </div>

          <button
            onClick={onClose}
            className="
              text-muted-theme
              surface-hover-theme
              rounded-xl
              p-2
              transition
            "
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}

        <div
          className="
            flex-1
            overflow-y-auto
            p-5
            sm:p-8
          "
        >
          <div className="space-y-6">

            {/* Description */}

            <div>
              <div className="mb-3 flex items-center gap-2">
                <FileText
                  size={18}
                  className="text-muted-theme"
                />

                <h3 className="text-theme font-semibold">
                  Description
                </h3>
              </div>

              <div
                className="
                  surface-theme
                  text-muted-theme
                  rounded-2xl
                  p-4
                  text-sm
                  leading-6
                   whitespace-pre
                "
              >
                {task.description || "No description provided."}
              </div>
            </div>

            {/* Details */}

            <div className="grid gap-4 sm:grid-cols-2">

              {/* Category */}

              <div
                className="
                  border-theme
                  rounded-2xl
                  border
                  p-5
                "
              >
                <div className="text-muted-theme mb-3 flex items-center gap-2">
                  <FolderKanban size={18} />

                  <span className="text-sm font-medium">
                    Category
                  </span>
                </div>

                <p className="text-theme font-semibold">
                  {task.category}
                </p>
              </div>

              {/* Status */}

              <div
                className="
                  border-theme
                  rounded-2xl
                  border
                  p-5
                "
              >
                <div className="text-muted-theme mb-3 flex items-center gap-2">
                  <CheckCircle2 size={18} />

                  <span className="text-sm font-medium">
                    Status
                  </span>
                </div>

                <span
                  className={`
                    inline-flex
                    rounded-full
                    px-3
                    py-1
                    text-sm
                    font-medium
                    ${statusStyles[task.status]}
                  `}
                >
                  {task.status}
                </span>
              </div>

              {/* Priority */}

              <div
                className="
                  border-theme
                  rounded-2xl
                  border
                  p-5
                "
              >
                <div className="text-muted-theme mb-3 flex items-center gap-2">
                  <Flag size={18} />

                  <span className="text-sm font-medium">
                    Priority
                  </span>
                </div>

                <span
                  className={`
                    inline-flex
                    rounded-full
                    px-3
                    py-1
                    text-sm
                    font-medium
                    ${
                      priorityStyles[
                        task.priority || "medium"
                      ]
                    }
                  `}
                >
                  {(task.priority || "Medium")
                    .charAt(0)
                    .toUpperCase() +
                    (task.priority || "Medium").slice(1)}
                </span>
              </div>

              {/* Due Date */}

              <div
                className="
                  border-theme
                  rounded-2xl
                  border
                  p-5
                "
              >
                <div className="text-muted-theme mb-3 flex items-center gap-2">
                  <CalendarDays size={18} />

                  <span className="text-sm font-medium">
                    Due Date
                  </span>
                </div>

                <p className="text-theme font-semibold">
                  {dueDate
                    ? format(dueDate, "MMM dd, yyyy")
                    : "No due date"}
                </p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetailModal;