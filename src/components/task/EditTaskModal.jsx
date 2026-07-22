import { useEffect, useState } from "react";
import {
  Calendar,
  CheckCircle2,
  FileText,
  FolderOpen,
  Loader2,
  Pencil,
  Save,
  Signal,
  X,
} from "lucide-react";

import { useTasks } from "../../context/TaskContext";

const EditTaskModal = ({ task, isOpen, onClose }) => {
  const { updateTask } = useTasks();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Work");
  const [status, setStatus] = useState("todo");
  const [priority, setPriority] = useState("medium");
  const [dueDate, setDueDate] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!task) return;

    setTitle(task.title || "");
    setDescription(task.description || "");
    setCategory(task.category || "Work");
    setStatus(task.status || "todo");
    setPriority(task.priority || "medium");

    if (task.dueDate) {
      const date = task.dueDate.seconds
        ? new Date(task.dueDate.seconds * 1000)
        : new Date(task.dueDate);

      setDueDate(date.toISOString().split("T")[0]);
    } else {
      setDueDate("");
    }
  }, [task]);

  if (!isOpen || !task) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) return;

    setLoading(true);

    try {
      await updateTask(task.id, {
        title,
        description,
        category,
        status,
        priority,
        dueDate: dueDate ? new Date(dueDate) : null,
      });

      onClose();
    } catch (error) {
      console.error(error);
      alert("Failed to update task.");
    } finally {
      setLoading(false);
    }
  };

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
          flex
          max-h-[92vh]
          w-full
          max-w-2xl
          flex-col
          overflow-hidden
          rounded-2xl
          sm:rounded-3xl
          border
          border-theme
          card-theme
          shadow-theme
        "
      >
        {/* Header */}

        <div
          className="
            flex items-start justify-between
            gap-4
            border-b
            border-theme
            px-5
            py-5
            sm:px-8
          "
        >
          <div className="min-w-0">
            <h2 className="text-xl font-bold text-theme sm:text-2xl">
              Edit Task
            </h2>

            <p className="mt-1 text-sm text-muted-theme">
              Update your task information.
            </p>
          </div>

          <button
            onClick={onClose}
            className="
              rounded-xl
              p-2
              text-muted-theme
              transition
              surface-hover-theme
            "
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}

        <form
          onSubmit={handleSubmit}
          className="
            flex-1
            overflow-y-auto
            p-5
            sm:p-8
          "
        >
          <div className="space-y-6">

            {/* Title */}

            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-medium text-theme">
                <Pencil size={16} />
                Task Title
              </label>

              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter task title"
                className="
                  w-full
                  rounded-xl
                  sm:rounded-2xl
                  border
                  border-theme
                  surface-theme
                  text-theme
                  px-4
                  py-3
                  text-sm
                  outline-none
                  transition
                  focus:ring-4
                  focus:ring-slate-200/40
                "
              />
            </div>

            {/* Description */}

            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-medium text-theme">
                <FileText size={16} />
                Description
              </label>

              <textarea
                rows={5}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Write task details..."
                className="
                  w-full
                  resize-none
                  rounded-xl
                  sm:rounded-2xl
                  border
                  border-theme
                  surface-theme
                  text-theme
                  px-4
                  py-3
                  text-sm
                  outline-none
                  transition
                  focus:ring-4
                  focus:ring-slate-200/40
                "
              />
            </div>

            {/* Grid */}

            <div className="grid gap-5 md:grid-cols-2">

              {/* Category */}

              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-medium text-theme">
                  <FolderOpen size={16} />
                  Category
                </label>

                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="
                    w-full
                    rounded-xl
                    sm:rounded-2xl
                    border
                    border-theme
                    surface-theme
                    text-theme
                    px-4
                    py-3
                    text-sm
                    outline-none
                    transition
                    focus:ring-4
                    focus:ring-slate-200/40
                  "
                >
                  <option>Work</option>
                  <option>Personal</option>
                  <option>Study</option>
                </select>
              </div>

              {/* Due Date */}

              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-medium text-theme">
                  <Calendar size={16} />
                  Due Date
                </label>

                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="
                    w-full
                    rounded-xl
                    sm:rounded-2xl
                    border
                    border-theme
                    surface-theme
                    text-theme
                    px-4
                    py-3
                    text-sm
                    outline-none
                    transition
                    focus:ring-4
                    focus:ring-slate-200/40
                  "
                />
              </div>

              {/* Status */}

              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-medium text-theme">
                  <CheckCircle2 size={16} />
                  Status
                </label>

                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="
                    w-full
                    rounded-xl
                    sm:rounded-2xl
                    border
                    border-theme
                    surface-theme
                    text-theme
                    px-4
                    py-3
                    text-sm
                    outline-none
                    transition
                    focus:ring-4
                    focus:ring-slate-200/40
                  "
                >
                  <option value="todo">Todo</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>

              {/* Priority */}

              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-medium text-theme">
                  <Signal size={16} />
                  Priority
                </label>

                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  className="
                    w-full
                    rounded-xl
                    sm:rounded-2xl
                    border
                    border-theme
                    surface-theme
                    text-theme
                    px-4
                    py-3
                    text-sm
                    outline-none
                    transition
                    focus:ring-4
                    focus:ring-slate-200/40
                  "
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

            </div>

            {/* Footer */}

            <div
              className="
                flex
                flex-col-reverse
                gap-3
                border-t
                border-theme
                pt-6
                sm:flex-row
                sm:justify-end
              "
            >
              <button
                type="button"
                onClick={onClose}
                disabled={loading}
                className="
                  w-full
                  rounded-xl
                  border
                  border-theme
                  surface-theme
                  px-6
                  py-3
                  font-medium
                  text-theme
                  transition
                  surface-hover-theme
                  sm:w-auto
                "
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={loading}
                className="
                  flex
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  primary-theme
                  px-6
                  py-3
                  font-medium
                  transition
                  opacity-100
                  hover:opacity-90
                  disabled:cursor-not-allowed
                  disabled:opacity-70
                  sm:w-auto
                "
              >
                {loading ? (
                  <>
                    <Loader2
                      size={18}
                      className="animate-spin"
                    />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save size={18} />
                    Save Changes
                  </>
                )}
              </button>
            </div>

          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTaskModal;