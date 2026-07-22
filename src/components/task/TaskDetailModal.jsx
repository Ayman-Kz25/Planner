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
  todo: "bg-slate-100 text-slate-700",
  "in-progress": "bg-amber-100 text-amber-700",
  completed: "bg-emerald-100 text-emerald-700",
};

const priorityStyles = {
  low: "bg-emerald-100 text-emerald-700",
  medium: "bg-yellow-100 text-yellow-700",
  high: "bg-rose-100 text-rose-700",
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
        bg-slate-900/50
        backdrop-blur-sm
        p-3 sm:p-5
      "
    >
      <div
        className="
          flex
          max-h-[92vh]
          w-full
          max-w-2xl
          flex-col
          overflow-hidden
          rounded-2xl
          sm:rounded-3xl
          border
          border-slate-200
          bg-white
          shadow-2xl
        "
      >
        {/* Header */}

        <div
          className="
            flex items-start justify-between
            gap-4
            border-b
            border-slate-200
            px-5
            py-5
            sm:px-8
          "
        >
          <div className="min-w-0">
            <h2
              className="
                break-words
                text-xl
                font-bold
                text-slate-900
                sm:text-2xl
              "
            >
              {task.title}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Task Details
            </p>
          </div>

          <button
            onClick={onClose}
            className="
              rounded-xl
              p-2
              text-slate-500
              transition
              hover:bg-slate-100
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
                  className="text-slate-500"
                />

                <h3 className="font-semibold text-slate-900">
                  Description
                </h3>
              </div>

              <div
                className="
                  rounded-2xl
                  bg-slate-50
                  p-4
                  text-sm
                  leading-6
                  text-slate-600
                "
              >
                {task.description || "No description provided."}
              </div>
            </div>

            {/* Details */}

            <div className="grid gap-4 sm:grid-cols-2">

              {/* Category */}

              <div className="rounded-2xl border border-slate-200 p-5">
                <div className="mb-3 flex items-center gap-2 text-slate-500">
                  <FolderKanban size={18} />

                  <span className="text-sm font-medium">
                    Category
                  </span>
                </div>

                <p className="font-semibold text-slate-900">
                  {task.category}
                </p>
              </div>

              {/* Status */}

              <div className="rounded-2xl border border-slate-200 p-5">
                <div className="mb-3 flex items-center gap-2 text-slate-500">
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

              <div className="rounded-2xl border border-slate-200 p-5">
                <div className="mb-3 flex items-center gap-2 text-slate-500">
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
                  {task.priority || "Medium"}
                </span>
              </div>

              {/* Due Date */}

              <div className="rounded-2xl border border-slate-200 p-5">
                <div className="mb-3 flex items-center gap-2 text-slate-500">
                  <CalendarDays size={18} />

                  <span className="text-sm font-medium">
                    Due Date
                  </span>
                </div>

                <p className="font-semibold text-slate-900">
                  {dueDate
                    ? format(dueDate, "MMM dd, yyyy")
                    : "No due date"}
                </p>
              </div>

            </div>
          </div>
        </div>

        {/* Footer */}

        <div
          className="
            border-t
            border-slate-200
            p-5
            sm:px-8
          "
        >
          <button
            onClick={onClose}
            className="
              w-full
              rounded-xl
              border
              border-slate-300
              px-6
              py-3
              font-medium
              text-slate-700
              transition
              hover:bg-slate-100

              sm:w-auto
            "
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskDetailModal;