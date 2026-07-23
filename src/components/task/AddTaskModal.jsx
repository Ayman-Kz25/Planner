import { useEffect, useState } from "react";
import { Timestamp } from "firebase/firestore";
import {
  Calendar,
  FileText,
  Flag,
  FolderOpen,
  Loader2,
  PlusCircle,
  X,
} from "lucide-react";

import { useTasks } from "../../context/TaskContext";
import { useSettings } from "../../context/SettingsContext";
import toast from "react-hot-toast";

const AddTaskModal = ({ isOpen, onClose }) => {
  const { addTask } = useTasks();
  const { settings } = useSettings();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(settings.defaultCategory);
  const [priority, setPriority] = useState(
    settings.defaultPriority.toLowerCase(),
  );
  const [dueDate, setDueDate] = useState("");
  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setCategory(settings.defaultCategory);
    setPriority(settings.defaultPriority.toLowerCase());
    setDueDate("");
  };

  const handleSubmit = async (e) => {
    if (loading) return;

    e.preventDefault();

    if (!title.trim()) {
      toast.error("Task title is required.");
      return;
    }

    setLoading(true);

    try {
      await addTask({
        title,
        description,
        category,
        status: "todo",
        priority,
        dueDate: dueDate
          ? Timestamp.fromDate(new Date(`${dueDate}T00:00:00`))
          : null,
      });

      handleClose();
      if (settings.notifications) {
        toast.success("Task created.");
      }
    } catch (error) {
      console.error(error);
      if (settings.notifications) {
        toast.error("Failed to create task.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (loading) return;

    resetForm();
    onClose();
  };

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape" && !loading) {
        handleClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, loading, handleClose]);

  useEffect(() => {
    if (!isOpen) return;

    resetForm();
  }, [isOpen, settings.defaultCategory, settings.defaultPriority]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-3 sm:p-5
      "
    >
      <div className="card-theme border-theme shadow-theme flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border *:sm:rounded-3xl">
        {/* Header */}

        <div className="border-theme flex items-start justify-between gap-4 border-b px-5 py-5 sm:px-8">
          <div className="min-w-0">
            <h2 className="text-theme text-xl font-bold sm:text-2xl">
              Create Task
            </h2>

            <p className="text-muted-theme mt-1 text-sm">
              Add a new task to your planner.
            </p>
          </div>

          <button
            onClick={handleClose}
            disabled={loading}
            className="text-muted-theme surface-hover-theme rounded-xl p-2 transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}

        <form
          onSubmit={handleSubmit}
          className="flex-1 overflow-y-auto p-5 sm:p-8"
        >
          <div className="space-y-6">
            {/* Title */}

            <div>
              <label className="text-theme mb-2 flex items-center gap-2 text-sm font-medium">
                <PlusCircle size={16} />
                Task Title
              </label>

              <input
                autoFocus
                type="text"
                disabled={loading}
                placeholder="Enter task title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="surface-theme border-theme text-theme w-full rounded-xl border px-4 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-[var(--primary)] focus:ring-4 focus:ring-[color:var(--shadow)] sm:rounded-2xl"
              />
            </div>

            {/* Description */}

            <div>
              <label className="text-theme mb-2 flex items-center gap-2 text-sm font-medium">
                <FileText size={16} />
                Description
              </label>

              <textarea
                rows={5}
                disabled={loading}
                placeholder="Write task details..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="surface-theme border-theme text-theme w-full resize-none rounded-xl border px-4 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-[var(--primary)] focus:ring-4 focus:ring-[color:var(--shadow)] sm:rounded-2xl"
              />
            </div>

            {/* Category & Date */}

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="text-theme mb-2 flex items-center gap-2 text-sm font-medium">
                  <FolderOpen size={16} />
                  Category
                </label>

                <select
                  value={category}
                  disabled={loading}
                  onChange={(e) => setCategory(e.target.value)}
                  className="surface-theme border-theme text-theme w-full rounded-xl border px-4 py-3 text-sm outline-none transition focus:border-[var(--primary)] focus:ring-4 focus:ring-[color:var(--shadow)] sm:rounded-2xl"
                >
                  <option>Work</option>
                  <option>Personal</option>
                  <option>Study</option>
                </select>
              </div>
              <div>
                <label className="text-theme mb-2 flex items-center gap-2 text-sm font-medium">
                  <Flag size={16} />
                  Priority
                </label>

                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  disabled={loading}
                  className={`surface-theme border-theme text-theme w-full rounded-xl border px-4 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-[var(--primary)] focus:ring-4 focus:ring-[color:var(--shadow)] disabled:cursor-not-allowed disabled:opacity-60 sm:rounded-2xl`}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              <div>
                <label className="text-theme mb-2 flex items-center gap-2 text-sm font-medium">
                  <Calendar size={16} />
                  Due Date
                </label>

                <input
                  type="date"
                  required
                  min={new Date().toISOString().split("T")[0]}
                  disabled={loading}
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="surface-theme border-theme text-theme w-full rounded-xl border px-4 py-3 text-sm outline-none transition focus:border-[var(--primary)] focus:ring-4 focus:ring-[color:var(--shadow)] sm:rounded-2xl"
                />
              </div>
            </div>
          </div>

          {/* Footer */}

          <div className="border-theme mt-8 flex flex-col-reverse gap-3 border-t pt-6 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={handleClose}
              disabled={loading}
              className="surface-theme surface-hover-theme border-theme text-theme w-full rounded-xl border px-6 py-3 font-medium transition sm:w-auto"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="primary-theme flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3 font-medium transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
            >
              {loading && <Loader2 size={18} className="animate-spin" />}

              {loading ? "Creating..." : "Create Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTaskModal;
